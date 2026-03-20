import type { NextApiRequest, NextApiResponse } from 'next';

import { GITHUB_PINNED_REPO } from '@/utils/url';

const USERNAME = process.env.NEXT_PUBLIC_DEVTO_USERNAME || 'lucasheartcliff';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(GITHUB_PINNED_REPO(USERNAME));

  if (!response.ok) {
    return res.status(response.status).json({ error: 'Failed to fetch repos' });
  }

  const repos = await response.json();
  return res.status(200).json(repos);
}
