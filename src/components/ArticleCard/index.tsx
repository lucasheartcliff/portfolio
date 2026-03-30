import ExportOutlined from '@ant-design/icons/ExportOutlined';
import Tooltip from 'antd/lib/tooltip';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { DevtoArticleIndex } from '@/services/devto';
import { normalizeTags } from '@/services/devto';

import Link from '../Link';

interface Props {
  article: DevtoArticleIndex;
}

export default function ArticleCard({ article }: Props) {
  const { t, i18n } = useTranslation('common');
  const tags = normalizeTags(article);
  const locale = i18n.language || 'en';

  const isNew =
    Date.now() - new Date(article.published_at).getTime() <
    30 * 24 * 60 * 60 * 1000;

  return (
    <div className="flex w-full min-w-0 flex-col overflow-hidden border border-gray-200 p-4 text-base shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-white md:w-72 md:text-xl">
      <div className="flex flex-row items-start justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 truncate font-semibold text-black dark:text-white">
            <Tooltip title={article.title}>
              <span className="truncate">{article.title}</span>
            </Tooltip>
            {isNew && (
              <span className="inline-flex shrink-0 items-center rounded-full bg-green-100 px-1.5 py-0.5 text-[10px] font-bold uppercase leading-none text-green-700 dark:bg-green-900 dark:text-green-300">
                {t('New')}
              </span>
            )}
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
            <span>
              {article.reading_time_minutes} {t('min read')}
            </span>
            <span>
              {new Date(article.published_at).toLocaleDateString(locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>

        <div className="ml-3 mt-1 flex shrink-0 items-center justify-center">
          <Link
            target="_blank"
            href={`/articles/${article.slug}`}
            skipLocaleHandling
          >
            <ExportOutlined className="text-base font-extrabold text-black dark:text-white" />
          </Link>
        </div>
      </div>
      {article.description && (
        <p className="mt-2 line-clamp-2 break-words text-sm text-gray-600 dark:text-gray-400">
          {article.description}
        </p>
      )}
      {tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded bg-gray-200 px-2 py-0.5 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
