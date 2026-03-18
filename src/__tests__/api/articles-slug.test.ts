import type { NextApiRequest, NextApiResponse } from 'next';

const mockFetch = jest.fn();
global.fetch = mockFetch;

jest.mock('@/services/devto', () => ({
  fetchAllMyArticles: jest.fn().mockResolvedValue([]),
}));

import handler from '@/pages/api/articles/[slug]';

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

describe('GET /api/articles/[slug]', () => {
  afterEach(() => {
    mockFetch.mockReset();
  });

  it('should return published article when found', async () => {
    const articleData = { id: 1, title: 'Published', slug: 'test' };
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(articleData),
    });

    const res = createMockRes();
    await handler(
      { query: { slug: 'test' } } as unknown as NextApiRequest,
      res
    );
    expect(res._status).toBe(200);
    expect(res._json).toEqual(articleData);
  });

  it('should return 404 when article not found', async () => {
    mockFetch.mockResolvedValue({ ok: false });

    const res = createMockRes();
    await handler(
      { query: { slug: 'nonexistent' } } as unknown as NextApiRequest,
      res
    );
    expect(res._status).toBe(404);
  });
});
