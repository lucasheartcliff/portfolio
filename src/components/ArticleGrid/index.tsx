import React from 'react';

import type { DevtoArticleIndex } from '@/services/devto';

import ArticleCard from '../ArticleCard';

interface Props {
  articles: DevtoArticleIndex[];
}

export default function ArticleGrid({ articles }: Props) {
  if (!articles.length) return null;

  return (
    <div className="my-2 flex min-w-0 w-full flex-wrap justify-items-start gap-1.5 overflow-hidden">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
