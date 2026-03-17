const DEVTO_API = 'https://dev.to/api';
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

function getCache<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const entry: CacheEntry<T> = JSON.parse(raw);
    if (Date.now() - entry.timestamp > CACHE_TTL) {
      localStorage.removeItem(key);
      return null;
    }
    return entry.data;
  } catch {
    return null;
  }
}

function setCache<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;
  try {
    const entry: CacheEntry<T> = { data, timestamp: Date.now() };
    localStorage.setItem(key, JSON.stringify(entry));
  } catch {
    // localStorage full or unavailable
  }
}

/** Shared user object from the API */
export interface DevtoUser {
  name: string;
  username: string;
  twitter_username: string | null;
  github_username: string | null;
  website_url: string | null;
  profile_image: string;
  profile_image_90: string;
}

/**
 * Article as returned by the list endpoint (GET /articles?username=).
 * Per the Forem OpenAPI spec (ArticleIndex schema):
 * - `tag_list` is string[]
 * - `tags` is a comma-separated string
 * - Does NOT include `body_markdown` or `body_html`
 */
export interface DevtoArticleIndex {
  type_of: string;
  id: number;
  title: string;
  description: string;
  slug: string;
  path: string;
  url: string;
  canonical_url: string;
  cover_image: string | null;
  social_image: string | null;
  readable_publish_date: string;
  published_at: string;
  published_timestamp: string;
  created_at: string;
  edited_at: string | null;
  crossposted_at: string | null;
  last_comment_at: string;
  reading_time_minutes: number;
  tag_list: string[];
  tags: string;
  comments_count: number;
  positive_reactions_count: number;
  public_reactions_count: number;
  user: DevtoUser;
  organization?: {
    name: string;
    username: string;
    slug: string;
    profile_image: string;
    profile_image_90: string;
  };
  flare_tag?: {
    name: string;
    bg_color_hex: string | null;
    text_color_hex: string | null;
  };
}

/**
 * Full article as returned by GET /articles/{username}/{slug} or GET /articles/{id}.
 * Includes `body_markdown` and `body_html` in addition to index fields.
 * Note: In the single-article response, `tag_list` is a comma-separated string
 * and `tags` is string[] (inverted from the list endpoint).
 */
export interface DevtoArticleFull {
  type_of: string;
  id: number;
  title: string;
  description: string;
  slug: string;
  path: string;
  url: string;
  canonical_url: string;
  cover_image: string | null;
  social_image: string | null;
  readable_publish_date: string;
  published_at: string;
  published_timestamp: string;
  created_at: string;
  edited_at: string | null;
  crossposted_at: string | null;
  last_comment_at: string;
  reading_time_minutes: number;
  tag_list: string;
  tags: string[];
  comments_count: number;
  positive_reactions_count: number;
  public_reactions_count: number;
  body_html: string;
  body_markdown: string;
  user: DevtoUser;
  flare_tag?: {
    name: string;
    bg_color_hex: string | null;
    text_color_hex: string | null;
  };
}

/** Normalize tag_list to always be string[] regardless of endpoint quirks */
export function normalizeTags(
  article: DevtoArticleIndex | DevtoArticleFull
): string[] {
  if (Array.isArray(article.tag_list)) {
    return article.tag_list;
  }
  if (typeof article.tag_list === 'string' && article.tag_list) {
    return (article.tag_list as string)
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
  }
  if (Array.isArray(article.tags)) {
    return article.tags;
  }
  if (typeof article.tags === 'string' && article.tags) {
    return (article.tags as string)
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
  }
  return [];
}

export async function fetchArticles(
  username: string
): Promise<DevtoArticleIndex[]> {
  const cacheKey = `devto_articles_${username}`;
  const cached = getCache<DevtoArticleIndex[]>(cacheKey);
  if (cached) return cached;

  const res = await fetch(
    `${DEVTO_API}/articles?username=${encodeURIComponent(username)}&per_page=30`
  );
  if (!res.ok) return [];
  const articles: DevtoArticleIndex[] = await res.json();
  setCache(cacheKey, articles);
  return articles;
}

/**
 * Fetch unpublished (draft) articles for the authenticated user.
 * Requires DEVTO_API_KEY — server-side only.
 */
export async function fetchUnpublishedArticles(
  apiKey: string
): Promise<DevtoArticleIndex[]> {
  const res = await fetch(`${DEVTO_API}/articles/me/unpublished?per_page=30`, {
    headers: { 'api-key': apiKey },
  });
  if (!res.ok) return [];
  return res.json();
}

/** Article returned by /articles/me/* endpoints — includes body_markdown. */
export type DevtoMyArticle = DevtoArticleIndex & {
  published: boolean;
  body_markdown: string;
  page_views_count: number;
};

/**
 * Fetch all articles (published + unpublished) for the authenticated user.
 * Requires DEVTO_API_KEY — server-side only.
 */
export async function fetchAllMyArticles(
  apiKey: string
): Promise<DevtoMyArticle[]> {
  const res = await fetch(`${DEVTO_API}/articles/me/all?per_page=30`, {
    headers: { 'api-key': apiKey },
  });
  if (!res.ok) return [];
  return res.json();
}

export async function fetchArticleBySlug(
  username: string,
  slug: string
): Promise<DevtoArticleFull | null> {
  const cacheKey = `devto_article_${username}_${slug}`;
  const cached = getCache<DevtoArticleFull>(cacheKey);
  if (cached) return cached;

  const res = await fetch(
    `${DEVTO_API}/articles/${encodeURIComponent(username)}/${encodeURIComponent(
      slug
    )}`
  );
  if (!res.ok) return null;
  const article: DevtoArticleFull = await res.json();
  setCache(cacheKey, article);
  return article;
}
