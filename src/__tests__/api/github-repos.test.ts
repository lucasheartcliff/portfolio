import type { NextApiRequest, NextApiResponse } from 'next';

import handler from '@/pages/api/github/repos';

const mockFetch = jest.fn();
global.fetch = mockFetch;

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
    expect(res._status).toBe(200);
    expect(res._json).toEqual(repos);
  });

  it('should forward error status on failure', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 500,
      json: () => Promise.resolve({}),
    });
    const res = createMockRes();
    await handler({} as NextApiRequest, res);
    expect(res._status).toBe(500);
  });
});
