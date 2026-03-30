import type { NextApiRequest, NextApiResponse } from 'next';

import handler from '@/pages/api/articles';

jest.mock('@/services/devto', () => ({
  fetchArticles: jest
    .fn()
    .mockResolvedValue([{ id: 1, title: 'Test Article' }]),
  fetchAllMyArticles: jest
    .fn()
    .mockResolvedValue([
      { id: 2, title: 'Draft', published: false, slug: 'draft' },
    ]),
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

describe('GET /api/articles', () => {
  const originalApiKey = process.env.DEVTO_API_KEY;

  beforeEach(() => {
    delete process.env.DEVTO_API_KEY;
  });

  afterEach(() => {
    if (originalApiKey !== undefined) {
      process.env.DEVTO_API_KEY = originalApiKey;
    }
  });

  it('should return published articles', async () => {
    const res = createMockRes();
    await handler({} as NextApiRequest, res);
    expect(res.statusCode).toBe(200);
    expect(res.jsonBody).toEqual([{ id: 1, title: 'Test Article' }]);
  });
});
