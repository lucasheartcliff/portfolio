import type { NextApiRequest, NextApiResponse } from 'next';

jest.mock('@/services/devto', () => ({
  fetchArticles: jest.fn().mockResolvedValue([
    { id: 1, title: 'Test Article' },
  ]),
  fetchAllMyArticles: jest.fn().mockResolvedValue([
    { id: 2, title: 'Draft', published: false, slug: 'draft' },
  ]),
}));

import handler from '@/pages/api/articles';

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

describe('GET /api/articles', () => {
  it('should return published articles', async () => {
    const res = createMockRes();
    await handler({} as NextApiRequest, res);
    expect(res._status).toBe(200);
    expect(res._json).toEqual([{ id: 1, title: 'Test Article' }]);
  });
});
