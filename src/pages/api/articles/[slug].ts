import type { NextApiRequest, NextApiResponse } from 'next';

import { fetchAllMyArticles } from '@/services/devto';

const DEVTO_API = 'https://dev.to/api';
const USERNAME = process.env.NEXT_PUBLIC_DEVTO_USERNAME || 'lucasheartcliff';
const isDev = process.env.NODE_ENV === 'development';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query;

  try {
    // Try published article by username/slug
    const published = await fetch(`${DEVTO_API}/articles/${USERNAME}/${slug}`);

    if (published.ok) {
      return res.status(200).json(await published.json());
    }

    // Draft fallback — only in dev mode
    if (!isDev) {
      console.error(
        `[API] GET /api/articles/${slug} not found (published lookup failed: ${published.status})`
      );
      return res.status(404).json({ error: 'Article not found' });
    }

    const apiKey = process.env.DEVTO_API_KEY;
    if (!apiKey) {
      console.error(
        `[API] GET /api/articles/${slug} not found (no DEVTO_API_KEY for draft fallback)`
      );
      return res.status(404).json({ error: 'Article not found' });
    }

    const allArticles = await fetchAllMyArticles(apiKey);
    const match = allArticles.find((a) => a.slug === slug);

    if (!match) {
      console.error(`[API] GET /api/articles/${slug} not found in drafts`);
      return res.status(404).json({ error: 'Article not found' });
    }

    return res.status(200).json(match);
  } catch (error) {
    console.error(`[API] GET /api/articles/${slug} failed:`, error);
    return res.status(500).json({ error: 'Failed to fetch article' });
  }
}
