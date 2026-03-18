import type { NextApiRequest, NextApiResponse } from 'next';

import handler from '@/pages/api/github/repos';

const mockFetch = jest.fn();
global.fetch = mockFetch;

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

describe('GET /api/github/repos', () => {
  afterEach(() => {
    mockFetch.mockReset();
  });

  it('should return repos on success', async () => {
    const repos = [{ name: 'portfolio', language: 'TypeScript' }];
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(repos),
    });
    const res = createMockRes();
    await handler({} as NextApiRequest, res);
    expect(res.statusCode).toBe(200);
    expect(res.jsonBody).toEqual(repos);
  });

  it('should forward error status on failure', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 500,
      json: () => Promise.resolve({}),
    });
    const res = createMockRes();
    await handler({} as NextApiRequest, res);
    expect(res.statusCode).toBe(500);
  });
});
