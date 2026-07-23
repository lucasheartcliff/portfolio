import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { DevtoArticleIndex } from '@/services/devto';
import { normalizeTags } from '@/services/devto';

import { ACCENT, ACCENT_B, Glass, Reveal, SectionLabel } from './atoms';

const isNew = (publishedAt: string) =>
  Date.now() - new Date(publishedAt).getTime() < 30 * 24 * 60 * 60 * 1000;

const ArticleCard = ({
  article,
  accent,
  accentB,
  locale,
}: {
  article: DevtoArticleIndex;
  accent: string;
  accentB: string;
  locale: string;
}) => {
  const { t } = useTranslation('common');
  const tags = normalizeTags(article);
  const cat = tags[0] || 'Article';
  const fresh = isNew(article.published_at);
  return (
    <a href={`/articles/${article.slug}`} className="block h-full">
      <Glass className="proj-card flex h-full flex-col p-5">
        <div className="mb-3 flex items-center justify-between">
          <div
            className="font-mono text-[10.5px] uppercase tracking-[0.18em]"
            style={{ color: accent }}
          >
            #{cat}
          </div>
          {fresh && (
            <span
              className="rounded px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest"
              style={{
                color: accentB,
                border: `1px solid ${accentB}55`,
                background: `${accentB}11`,
              }}
            >
              {t('New')}
            </span>
          )}
        </div>
        <div className="mb-4 flex-1 font-display text-[17px] leading-snug tracking-tight text-fg">
          {article.title}
        </div>
        <div className="flex items-center justify-between border-t border-hairline pt-3 font-mono text-[11px] text-faint">
          <span>
            {new Date(article.published_at).toLocaleDateString(locale, {
              month: 'short',
              year: 'numeric',
            })}
          </span>
          <span>
            {article.reading_time_minutes} {t('min read')}
          </span>
        </div>
      </Glass>
    </a>
  );
};

interface Props {
  articles: DevtoArticleIndex[];
  error?: boolean;
  accent?: string;
  accentB?: string;
}

export default function ArticlesSection({
  articles,
  error = false,
  accent = ACCENT,
  accentB = ACCENT_B,
}: Props) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const locale = (router.query.locale as string) || 'en';
  if (!articles.length && !error) return null;
  return (
    <section id="writing" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <SectionLabel num="05" label={t('writing.label')} accent={accent} />
        </Reveal>
        <Reveal delay={80}>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-3xl tracking-[-0.02em] text-fg sm:text-5xl">
              {t('writing.title')}
            </h2>
          </div>
        </Reveal>

        {error ? (
          <Glass className="p-6 text-center text-[13px] text-muted">
            {t('writing.error', {
              defaultValue: "Couldn't load articles right now.",
            })}
          </Glass>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {articles.slice(0, 6).map((article, i) => (
              <Reveal key={article.id} delay={100 + i * 60}>
                <ArticleCard
                  article={article}
                  accent={accent}
                  accentB={accentB}
                  locale={locale}
                />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
