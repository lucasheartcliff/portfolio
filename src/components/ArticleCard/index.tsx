import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { DevtoArticleIndex } from '@/services/devto';
import { normalizeTags } from '@/services/devto';

import Link from '../Link';

interface Props {
  article: DevtoArticleIndex;
}

export default function ArticleCard({ article }: Props) {
  const { t } = useTranslation('common');
  const tags = normalizeTags(article);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Link
        href={article.url}
        target="_blank"
        className="block overflow-hidden rounded-lg border border-gray-200 no-underline shadow-sm transition-shadow hover:border-0 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
      >
        {article.cover_image && (
          <img
            src={article.cover_image}
            alt={article.title}
            className="h-40 w-full object-cover"
            loading="lazy"
          />
        )}
        <div className="p-4">
          <h4 className="line-clamp-2 text-lg font-semibold text-black dark:text-white">
            {article.title}
          </h4>
          <p className="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
            {article.description}
          </p>
          {tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
          <div className="mt-3 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span>{article.reading_time_minutes} {t('min read')}</span>
            <span>{new Date(article.published_at).toLocaleDateString()}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
