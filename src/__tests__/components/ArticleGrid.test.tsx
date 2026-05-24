import { render, screen } from '@testing-library/react';
import React from 'react';

import ArticleGrid from '@/components/ArticleGrid';
import type { DevtoArticleIndex } from '@/services/devto';

jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  }),
}));

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { locale: 'en' },
    asPath: '/',
    pathname: '/[locale]',
  }),
}));

const makeArticle = (id: number): DevtoArticleIndex => ({
  type_of: 'article',
  id,
  title: `Article ${id}`,
  description: `Description ${id}`,
  slug: `article-${id}`,
  path: `/article-${id}`,
  url: `https://dev.to/article-${id}`,
  canonical_url: `https://dev.to/article-${id}`,
  cover_image: null,
  social_image: null,
  readable_publish_date: 'Jan 1',
  published_at: '2025-01-01T00:00:00Z',
  published_timestamp: '2025-01-01T00:00:00Z',
  created_at: '2025-01-01T00:00:00Z',
  edited_at: null,
  crossposted_at: null,
  last_comment_at: '2025-01-01T00:00:00Z',
  reading_time_minutes: 3,
  tag_list: [],
  tags: '',
  comments_count: 0,
  positive_reactions_count: 0,
  public_reactions_count: 0,
  user: {
    name: 'User',
    username: 'user',
    twitter_username: null,
    github_username: null,
    website_url: null,
    profile_image: '',
    profile_image_90: '',
  },
});

describe('ArticleGrid', () => {
  it('should render articles', () => {
    const articles = [makeArticle(1), makeArticle(2)];
    render(<ArticleGrid articles={articles} />);
    expect(screen.getByText('Article 1')).toBeInTheDocument();
    expect(screen.getByText('Article 2')).toBeInTheDocument();
  });

  it('should return null when articles is empty', () => {
    const { container } = render(<ArticleGrid articles={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
