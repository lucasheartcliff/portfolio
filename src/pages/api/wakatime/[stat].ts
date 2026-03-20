import type { NextApiRequest, NextApiResponse } from 'next';

const WAKATIME_URLS: Record<string, string | undefined> = {
  languages: process.env.WAKATIME_LANGUAGES_URL,
  'coding-time': process.env.WAKATIME_CODING_TIME_URL,
  activity: process.env.WAKATIME_ACTIVITY_URL,
  editors: process.env.WAKATIME_EDITORS_URL,
  'code-activity': process.env.WAKATIME_CODE_ACTIVITY_URL,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { stat } = req.query;
  const url = WAKATIME_URLS[stat as string];

  if (!url) {
    return res.status(400).json({ error: `Unknown stat: ${stat}` });
  }

  const response = await fetch(url);

  if (!response.ok) {
    return res
      .status(response.status)
      .json({ error: 'Failed to fetch wakatime data' });
  }

  const data = await response.json();
  return res.status(200).json(data);
}
