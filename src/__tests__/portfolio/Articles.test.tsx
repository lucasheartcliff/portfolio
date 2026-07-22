import { render, screen } from '@testing-library/react';
import React from 'react';

import ArticlesSection from '@/components/portfolio/Articles';
import type { DevtoArticleIndex } from '@/services/devto';

jest.mock('next-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('next/router', () => ({
  useRouter: () => ({ query: { locale: 'en' } }),
}));

const baseArticle: DevtoArticleIndex = {
  type_of: 'article',
  id: 1,
  title: 'Understanding Backpressure',
  description: 'A deep dive',
  slug: 'understanding-backpressure',
  path: '/understanding-backpressure',
  url: 'https://dev.to/understanding-backpressure',
  canonical_url: 'https://dev.to/understanding-backpressure',
  cover_image: null,
  social_image: null,
  readable_publish_date: 'Jan 1',
  published_at: '2025-01-15T10:00:00Z',
  published_timestamp: '2025-01-15T10:00:00Z',
  created_at: '2025-01-15T10:00:00Z',
  edited_at: null,
  crossposted_at: null,
  last_comment_at: '2025-01-15T10:00:00Z',
  reading_time_minutes: 5,
  tag_list: ['systems'],
  tags: 'systems',
  comments_count: 0,
  positive_reactions_count: 0,
  public_reactions_count: 0,
  user: {
    name: 'Lucas Morais',
    username: 'lucasheartcliff',
    twitter_username: null,
    github_username: null,
    website_url: null,
    profile_image: '',
    profile_image_90: '',
  },
};

describe('ArticlesSection', () => {
  it('renders nothing with no articles', () => {
    const { container } = render(<ArticlesSection articles={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders an article card linking to the article page', () => {
    render(<ArticlesSection articles={[baseArticle]} />);
    expect(screen.getByText('Understanding Backpressure')).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-node-access
    const link = screen.getByText('Understanding Backpressure').closest('a');
    expect(link).toHaveAttribute(
      'href',
      '/articles/understanding-backpressure'
    );
  });

  it('shows at most 6 articles', () => {
    const many = Array.from({ length: 9 }, (_, i) => ({
      ...baseArticle,
      id: i,
      slug: `article-${i}`,
      title: `Article ${i}`,
    }));
    render(<ArticlesSection articles={many} />);
    expect(screen.getAllByText(/^Article \d$/)).toHaveLength(6);
  });
});
