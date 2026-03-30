import type { NextApiRequest, NextApiResponse } from 'next';

const USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'lucasheartcliff';
const { GITHUB_TOKEN } = process.env;

const PINNED_REPOS_QUERY = `
query ($username: String!) {
  user(login: $username) {
    pinnedItems(first: 6, types: REPOSITORY) {
      nodes {
        ... on Repository {
          name
          description
          url
          stargazerCount
          forkCount
          primaryLanguage {
            name
            color
          }
          repositoryTopics(first: 10) {
            nodes {
              topic {
                name
              }
            }
          }
        }
      }
    }
  }
}
`;

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${GITHUB_TOKEN}`,
      },
      body: JSON.stringify({
        query: PINNED_REPOS_QUERY,
        variables: { username: USERNAME },
      }),
    });

    if (!response.ok) {
      console.error(
        `[API] GET /api/github/repos failed: GitHub API returned ${response.status}`
      );
      return res
        .status(response.status)
        .json({ error: 'Failed to fetch repos' });
    }

    const json = await response.json();

    if (json.errors) {
      console.error('[API] GET /api/github/repos GraphQL errors:', json.errors);
      return res.status(502).json({ error: 'GitHub GraphQL error' });
    }

    const nodes = json.data?.user?.pinnedItems?.nodes ?? [];
    const repos = nodes.map((repo: any) => ({
      name: repo.name,
      description: repo.description,
      url: repo.url,
      stars: repo.stargazerCount,
      forks: repo.forkCount,
      language: repo.primaryLanguage?.name ?? null,
      languageColor: repo.primaryLanguage?.color ?? null,
      topics: repo.repositoryTopics?.nodes?.map((t: any) => t.topic.name) ?? [],
    }));

    return res.status(200).json(repos);
  } catch (error) {
    console.error('[API] GET /api/github/repos failed:', error);
    return res.status(500).json({ error: 'Failed to fetch repos' });
  }
}
