import { expect, test } from '@playwright/test';

const BODY = `Intro paragraph.

## The honest numbers

| | My app | Official Spotify |
|---|---|---|
| Size on disk | **3 MB** | 436 MB |
| Time to open | **229 ms** | 1031 ms |
`;

const article = {
  type_of: 'article',
  id: 1,
  title: 'I built a lightweight Spotify client',
  description: 'Intro paragraph.',
  slug: 'spotify-client',
  path: '/spotify-client',
  url: 'https://dev.to/spotify-client',
  canonical_url: 'https://dev.to/spotify-client',
  cover_image: null,
  social_image: null,
  readable_publish_date: 'Nov 24',
  published_at: '2026-11-24T10:00:00Z',
  published_timestamp: '2026-11-24T10:00:00Z',
  created_at: '2026-11-24T10:00:00Z',
  edited_at: null,
  crossposted_at: null,
  last_comment_at: '2026-11-24T10:00:00Z',
  reading_time_minutes: 5,
  tag_list: 'rust, tauri',
  tags: ['rust', 'tauri'],
  comments_count: 0,
  positive_reactions_count: 0,
  public_reactions_count: 0,
  body_html: '',
  body_markdown: BODY,
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

test.describe('article reader', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/articles/spotify-client', (route) =>
      route.fulfill({ json: article })
    );
    await page.route('**/api/articles', (route) => route.fulfill({ json: [] }));
    await page.goto('/articles/spotify-client');
  });

  test('renders markdown tables as a real table', async ({ page }) => {
    const table = page.getByTestId('article-table');
    await expect(table).toBeVisible();
    await expect(table.locator('th')).toHaveText([
      '',
      'My app',
      'Official Spotify',
    ]);
    await expect(table.locator('tbody tr')).toHaveCount(2);
  });

  test('shows tags in the header instead of the description', async ({
    page,
  }) => {
    const tags = page.getByTestId('article-tags');
    await expect(tags).toContainText('rust');
    await expect(tags).toContainText('tauri');
    await expect(page.getByTestId('article-subtitle')).toHaveCount(0);
  });

  test('uses the site sans font for body text, not the browser serif', async ({
    page,
  }) => {
    const family = await page
      .locator('.prose-body p')
      .first()
      .evaluate((el) => getComputedStyle(el).fontFamily);
    expect(family).toMatch(/space grotesk|__Space_Grotesk/i);
  });
});
