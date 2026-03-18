import type { NextApiRequest, NextApiResponse } from 'next';

import handler from '@/pages/api/articles/[slug]';

const mockFetch = jest.fn();
global.fetch = mockFetch;

jest.mock('@/services/devto', () => ({
  fetchAllMyArticles: jest.fn().mockResolvedValue([]),
}));

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
    expect(res.statusCode).toBe(200);
    expect(res.jsonBody).toEqual(articleData);
  });

  it('should return 404 when article not found', async () => {
    mockFetch.mockResolvedValue({ ok: false });

    const res = createMockRes();
    await handler(
      { query: { slug: 'nonexistent' } } as unknown as NextApiRequest,
      res
    );
    expect(res.statusCode).toBe(404);
  });
});
