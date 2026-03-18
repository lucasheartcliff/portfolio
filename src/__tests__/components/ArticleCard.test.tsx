import { render, screen } from '@testing-library/react';
import React from 'react';

import ArticleCard from '@/components/ArticleCard';
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

describe('ArticleCard', () => {
  const article: DevtoArticleIndex = {
    type_of: 'article',
    id: 1,
    title: 'Test Article Title',
    description: 'A description of the test article',
    slug: 'test-article',
    path: '/test-article',
    url: 'https://dev.to/test-article',
    canonical_url: 'https://dev.to/test-article',
    cover_image: 'https://example.com/cover.jpg',
    social_image: null,
    readable_publish_date: 'Jan 1',
    published_at: '2025-01-15T10:00:00Z',
    published_timestamp: '2025-01-15T10:00:00Z',
    created_at: '2025-01-15T10:00:00Z',
    edited_at: null,
    crossposted_at: null,
    last_comment_at: '2025-01-15T10:00:00Z',
    reading_time_minutes: 5,
    tag_list: ['react', 'typescript'],
    tags: 'react, typescript',
    comments_count: 0,
    positive_reactions_count: 0,
    public_reactions_count: 0,
    user: {
      name: 'Test User',
      username: 'testuser',
      twitter_username: null,
      github_username: null,
      website_url: null,
      profile_image: '',
      profile_image_90: '',
    },
  };

  it('should render article title', () => {
    render(<ArticleCard article={article} />);
    expect(screen.getByText('Test Article Title')).toBeInTheDocument();
  });

  it('should render article description', () => {
    render(<ArticleCard article={article} />);
    expect(
      screen.getByText('A description of the test article')
    ).toBeInTheDocument();
  });

  it('should render reading time', () => {
    render(<ArticleCard article={article} />);
    expect(screen.getByText(/5.*min read/)).toBeInTheDocument();
  });

  it('should render tags', () => {
    render(<ArticleCard article={article} />);
    expect(screen.getByText('#react')).toBeInTheDocument();
    expect(screen.getByText('#typescript')).toBeInTheDocument();
  });

  it('should render cover image when available', () => {
    render(<ArticleCard article={article} />);
    const img = screen.getByAltText('Test Article Title');
    expect(img).toHaveAttribute('src', 'https://example.com/cover.jpg');
  });

  it('should not render cover image when not available', () => {
    const noCoverArticle = { ...article, cover_image: null };
    render(<ArticleCard article={noCoverArticle} />);
    expect(
      screen.queryByAltText('Test Article Title')
    ).not.toBeInTheDocument();
  });

  it('should format the date with locale options', () => {
    render(<ArticleCard article={article} />);
    // The date should be formatted with locale - "January 15, 2025" for en
    expect(screen.getByText('January 15, 2025')).toBeInTheDocument();
  });
});
