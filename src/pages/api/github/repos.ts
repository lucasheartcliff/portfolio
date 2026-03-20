import type { NextApiRequest, NextApiResponse } from 'next';

import { GITHUB_PINNED_REPO } from '@/utils/url';

const USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'lucasheartcliff';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(GITHUB_PINNED_REPO(USERNAME));

    if (!response.ok) {
      console.error(
        `[API] GET /api/github/repos failed: upstream returned ${response.status}`
      );
      return res
        .status(response.status)
        .json({ error: 'Failed to fetch repos' });
    }

    const repos = await response.json();
    return res.status(200).json(repos);
  } catch (error) {
    console.error('[API] GET /api/github/repos failed:', error);
    return res.status(500).json({ error: 'Failed to fetch repos' });
  }
}
