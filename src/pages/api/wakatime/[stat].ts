import type { NextApiRequest, NextApiResponse } from 'next';

const WAKATIME_URLS: Record<string, string> = {
  languages:
    'https://wakatime.com/share/@lucasheartcliff/aa27a39b-9077-4411-8569-2887ac7d3cfb.json',
  'coding-time':
    'https://wakatime.com/share/@lucasheartcliff/1d8d3574-4f80-426c-9929-8213f089a012.json',
  activity:
    'https://wakatime.com/share/@lucasheartcliff/c5d9d32e-d588-48cf-baa4-725420fb3321.json',
  editors:
    'https://wakatime.com/share/@lucasheartcliff/5fc84e8d-fbe1-4a0f-998e-86fec4be7382.json',
  'code-activity':
    'https://wakatime.com/share/@lucasheartcliff/f4cd05b2-1074-468f-9325-c623f0e9f8e4.json',
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
