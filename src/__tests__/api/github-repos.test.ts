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

  it('should return mapped repos on success', async () => {
    const graphqlResponse = {
      data: {
        user: {
          pinnedItems: {
            nodes: [
              {
                name: 'portfolio',
                description: 'My portfolio site',
                url: 'https://github.com/lucasheartcliff/portfolio',
                stargazerCount: 5,
                forkCount: 1,
                primaryLanguage: { name: 'TypeScript', color: '#3178c6' },
                repositoryTopics: {
                  nodes: [{ topic: { name: 'nextjs' } }],
                },
              },
            ],
          },
        },
      },
    };
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(graphqlResponse),
    });
    const res = createMockRes();
    await handler({} as NextApiRequest, res);
    expect(res.statusCode).toBe(200);
    expect(res.jsonBody).toEqual([
      {
        name: 'portfolio',
        description: 'My portfolio site',
        url: 'https://github.com/lucasheartcliff/portfolio',
        stars: 5,
        forks: 1,
        language: 'TypeScript',
        languageColor: '#3178c6',
        topics: ['nextjs'],
      },
    ]);
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

  it('should return 502 on GraphQL errors', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({ errors: [{ message: 'Something went wrong' }] }),
    });
    const res = createMockRes();
    await handler({} as NextApiRequest, res);
    expect(res.statusCode).toBe(502);
  });
});
