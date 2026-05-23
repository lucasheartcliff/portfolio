import { useTranslation } from 'next-i18next';
import React from 'react';

import { ACCENT, ACCENT_B, Glass, Reveal, SectionLabel } from './atoms';

export interface ProjectDatum {
  name: string;
  desc: string;
  tags: string[];
  stars: number;
  forks: number;
  lang: string;
  langColor: string;
  url: string;
  featured?: boolean;
}

const ProjectCard = ({
  p,
  accent,
  accentB,
}: {
  p: ProjectDatum;
  accent: string;
  accentB: string;
}) => {
  const { t } = useTranslation('common');
  return (
    <a href={p.url} target="_blank" rel="noreferrer" className="block h-full">
      <Glass
        className={`proj-card flex h-full flex-col p-5 ${
          p.featured ? 'proj-featured' : ''
        }`}
      >
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-300">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M4 4h7l2 2h7v12a2 2 0 0 1-2 2H4z" />
            </svg>
            <span className="font-mono text-[13.5px] tracking-tight">
              {p.name}
            </span>
          </div>
          {p.featured && (
            <span
              className="rounded px-1.5 py-0.5 font-mono text-[9px] tracking-widest"
              style={{
                color: accent,
                border: `1px solid ${accent}55`,
                background: `${accent}11`,
              }}
            >
              {t('proj.pinned')}
            </span>
          )}
        </div>
        <p className="mb-4 flex-1 text-[13px] leading-relaxed text-slate-400">
          {p.desc}
        </p>
        {p.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {p.tags.map((tg) => (
              <span
                key={tg}
                className="rounded px-2 py-0.5 font-mono text-[10.5px]"
                style={{
                  color: accentB,
                  background: `${accentB}11`,
                  border: `1px solid ${accentB}33`,
                }}
              >
                {tg}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center gap-4 border-t border-white/5 pt-3 text-[11.5px] text-slate-500">
          {p.lang && (
            <span className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: p.langColor }}
              />
              {p.lang}
            </span>
          )}
          <span className="flex items-center gap-1">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
              <path d="m12 2 3 7 7 .5-5.5 4.5L18 22l-6-4-6 4 1.5-8L2 9.5 9 9z" />
            </svg>
            {p.stars}
          </span>
          <span className="flex items-center gap-1">
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="6" cy="6" r="2" />
              <circle cx="6" cy="18" r="2" />
              <circle cx="18" cy="6" r="2" />
              <path d="M6 8v4a4 4 0 0 0 4 4h2" />
              <path d="M18 8v8" />
            </svg>
            {p.forks}
          </span>
        </div>
      </Glass>
    </a>
  );
};

interface Props {
  projects: ProjectDatum[];
  accent?: string;
  accentB?: string;
  username?: string;
}

export default function ProjectsSection({
  projects,
  accent = ACCENT,
  accentB = ACCENT_B,
  username = 'lucasheartcliff',
}: Props) {
  const { t } = useTranslation('common');
  if (!projects.length) return null;
  return (
    <section id="projects" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <SectionLabel num="04" label={t('proj.label')} accent={accent} />
        </Reveal>
        <Reveal delay={80}>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-3xl tracking-[-0.02em] text-slate-100 sm:text-5xl">
              {t('proj.title')}
            </h2>
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 font-mono text-[12px] text-slate-400 transition hover:text-white"
            >
              {t('proj.allRepos')}
            </a>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={100 + i * 60}>
              <ProjectCard p={p} accent={accent} accentB={accentB} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
