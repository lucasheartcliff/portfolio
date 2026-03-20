import type { NextApiRequest, NextApiResponse } from 'next';

import handler from '@/pages/api/wakatime/[stat]';

process.env.WAKATIME_LANGUAGES_URL =
  'https://wakatime.com/share/@test/languages.json';
process.env.WAKATIME_CODING_TIME_URL =
  'https://wakatime.com/share/@test/coding-time.json';
process.env.WAKATIME_ACTIVITY_URL =
  'https://wakatime.com/share/@test/activity.json';
process.env.WAKATIME_EDITORS_URL =
  'https://wakatime.com/share/@test/editors.json';
process.env.WAKATIME_CODE_ACTIVITY_URL =
  'https://wakatime.com/share/@test/code-activity.json';

const mockFetch = jest.fn();
global.fetch = mockFetch;

function createMockReq(stat: string): NextApiRequest {
  return {
    query: { stat },
  } as unknown as NextApiRequest;
}

function createMockRes(): NextApiResponse & {
  statusCode: number;
  jsonBody: any;
} {
  const res = {
    statusCode: 0,
    jsonBody: null,
    status(code: number) {
      res.statusCode = code;
      return res;
    },
    json(data: any) {
      res.jsonBody = data;
      return res;
    },
  } as unknown as NextApiResponse & { statusCode: number; jsonBody: any };
  return res;
}

describe('GET /api/wakatime/[stat]', () => {
  afterEach(() => {
    mockFetch.mockReset();
  });

  it('should return 400 for unknown stat', async () => {
    const res = createMockRes();
    await handler(createMockReq('unknown'), res);
    expect(res.statusCode).toBe(400);
    expect(res.jsonBody.error).toContain('Unknown stat');
  });

  it('should proxy languages data', async () => {
    const mockData = { data: [{ name: 'TypeScript', percent: 50 }] };
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });
    const res = createMockRes();
    await handler(createMockReq('languages'), res);
    expect(res.statusCode).toBe(200);
    expect(res.jsonBody).toEqual(mockData);
  });

  it('should handle upstream errors', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 503,
    });
    const res = createMockRes();
    await handler(createMockReq('languages'), res);
    expect(res.statusCode).toBe(503);
  });
});
