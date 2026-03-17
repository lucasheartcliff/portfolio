import React from 'react';

import type { DevtoArticleIndex } from '@/services/devto';

import ArticleCard from '../ArticleCard';

interface Props {
  articles: DevtoArticleIndex[];
}

export default function ArticleGrid({ articles }: Props) {
  if (!articles.length) return null;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
