import type { NextApiRequest, NextApiResponse } from 'next';

import handler from '@/pages/api/wakatime/[stat]';

// Mock global fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

function createMockReq(stat: string): NextApiRequest {
  return {
    query: { stat },
  } as unknown as NextApiRequest;
}

function createMockRes(): NextApiResponse & { _status: number; _json: any } {
  const res = {
    _status: 0,
    _json: null,
    status(code: number) {
      res._status = code;
      return res;
    },
    json(data: any) {
      res._json = data;
      return res;
    },
  } as unknown as NextApiResponse & { _status: number; _json: any };
  return res;
}

describe('GET /api/wakatime/[stat]', () => {
  afterEach(() => {
    mockFetch.mockReset();
  });

  it('should return 400 for unknown stat', async () => {
    const res = createMockRes();
    await handler(createMockReq('unknown'), res);
    expect(res._status).toBe(400);
    expect(res._json.error).toContain('Unknown stat');
  });

  it('should proxy languages data', async () => {
    const mockData = { data: [{ name: 'TypeScript', percent: 50 }] };
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });
    const res = createMockRes();
    await handler(createMockReq('languages'), res);
    expect(res._status).toBe(200);
    expect(res._json).toEqual(mockData);
  });

  it('should handle upstream errors', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 503,
    });
    const res = createMockRes();
    await handler(createMockReq('languages'), res);
    expect(res._status).toBe(503);
  });
});
