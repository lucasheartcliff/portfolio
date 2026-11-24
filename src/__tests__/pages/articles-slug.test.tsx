import { render, screen } from '@testing-library/react';
import React from 'react';

import { ThemeProvider } from '@/contexts/ThemeContext';
import ArticlePage from '@/pages/articles/[slug]';
import type { DevtoArticleFull } from '@/services/devto';

jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, opts?: { defaultValue?: string }) =>
      opts?.defaultValue ?? key,
  }),
}));

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { slug: 'understanding-backpressure', locale: 'en' },
    basePath: '',
  }),
}));

// react-markdown ships ESM-only, which Jest's default CJS transform can't
// parse. Its own rendering is third-party, well-tested code; what these
// tests need to verify is that the page wires the right data into it, so a
// plain-text stand-in is enough.
jest.mock('react-markdown', () => {
  return function MockReactMarkdown({
    children,
    remarkPlugins,
  }: {
    children: string;
    remarkPlugins?: unknown[];
  }) {
    return (
      <div data-testid="markdown" data-plugins={remarkPlugins?.length ?? 0}>
        {children}
      </div>
    );
  };
});

// remark-gfm is ESM-only too; the page only needs to hand it to react-markdown.
jest.mock('remark-gfm', () => ({ __esModule: true, default: () => {} }));

const fullArticle: DevtoArticleFull = {
  type_of: 'article',
  id: 1,
  title: 'Understanding Backpressure',
  description: 'A deep dive into flow control',
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
  tag_list: 'systems',
  tags: ['systems'],
  comments_count: 0,
  positive_reactions_count: 0,
  public_reactions_count: 0,
  body_html: '<p>Body</p>',
  body_markdown: '# Heading\n\nSome body content.',
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

function mockFetchWith(articleResponse: Response) {
  global.fetch = jest.fn((url: string) => {
    if (url === '/api/articles/understanding-backpressure') {
      return Promise.resolve(articleResponse);
    }
    return Promise.resolve({ ok: true, json: async () => [] } as Response);
  }) as unknown as typeof fetch;
}

describe('ArticlePage', () => {
  it('renders the article title and body once loaded', async () => {
    mockFetchWith({ ok: true, json: async () => fullArticle } as Response);
    render(
      <ThemeProvider>
        <ArticlePage />
      </ThemeProvider>
    );
    expect(
      await screen.findByText('Understanding Backpressure')
    ).toBeInTheDocument();
    expect(screen.getByText(/Some body content/)).toBeInTheDocument();
  });

  it('shows a not-found state when the article fails to load', async () => {
    mockFetchWith({ ok: false, json: async () => null } as Response);
    render(
      <ThemeProvider>
        <ArticlePage />
      </ThemeProvider>
    );
    expect(await screen.findByText('Article not found.')).toBeInTheDocument();
  });

  it('renders a theme toggle', async () => {
    mockFetchWith({ ok: true, json: async () => fullArticle } as Response);
    render(
      <ThemeProvider>
        <ArticlePage />
      </ThemeProvider>
    );
    await screen.findByText('Understanding Backpressure');
    expect(
      screen.getAllByLabelText(/switch to (light|dark) theme/i).length
    ).toBeGreaterThan(0);
  });

  it('enables GFM so markdown tables render', async () => {
    mockFetchWith({ ok: true, json: async () => fullArticle } as Response);
    render(
      <ThemeProvider>
        <ArticlePage />
      </ThemeProvider>
    );
    expect(await screen.findByTestId('markdown')).toHaveAttribute(
      'data-plugins',
      '1'
    );
  });

  it('shows the article tags in the header instead of the description', async () => {
    const tagged = {
      ...fullArticle,
      tag_list: 'rust, tauri',
      tags: ['rust', 'tauri'],
    };
    mockFetchWith({ ok: true, json: async () => tagged } as Response);
    render(
      <ThemeProvider>
        <ArticlePage />
      </ThemeProvider>
    );
    const list = await screen.findByTestId('article-tags');
    expect(list).toHaveTextContent('rust');
    expect(list).toHaveTextContent('tauri');
    expect(
      screen.queryByText('A deep dive into flow control')
    ).not.toBeInTheDocument();
  });

  it('omits the tag list when the article has no tags', async () => {
    const untagged = { ...fullArticle, tag_list: '', tags: [] };
    mockFetchWith({ ok: true, json: async () => untagged } as Response);
    render(
      <ThemeProvider>
        <ArticlePage />
      </ThemeProvider>
    );
    await screen.findByTestId('markdown');
    expect(screen.queryByTestId('article-tags')).not.toBeInTheDocument();
  });
});
