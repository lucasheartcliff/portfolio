import type { NextApiRequest, NextApiResponse } from 'next';

import handler from '@/pages/api/wakatime/[stat]';

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
