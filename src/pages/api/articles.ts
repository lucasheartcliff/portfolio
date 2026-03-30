import type { NextApiRequest, NextApiResponse } from 'next';

import { fetchAllMyArticles, fetchArticles } from '@/services/devto';

const USERNAME = process.env.NEXT_PUBLIC_DEVTO_USERNAME || 'lucasheartcliff';
const isDev = process.env.NODE_ENV === 'development';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const apiKey = process.env.DEVTO_API_KEY;

    if (!apiKey) {
      const articles = await fetchArticles(USERNAME);
      return res.status(200).json(articles);
    }

    const articles = await fetchAllMyArticles(apiKey);

    if (isDev) {
      const tagged = articles.map((a) => ({
        ...a,
        title: a.published ? a.title : `[DRAFT] ${a.title}`,
      }));
      return res.status(200).json(tagged);
    }

    const published = articles.filter((a) => a.published);
    return res.status(200).json(published);
  } catch (error) {
    console.error('[API] GET /api/articles failed:', error);
    return res.status(500).json({ error: 'Failed to fetch articles' });
  }
}
