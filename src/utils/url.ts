export const WAKATIME_LANGUAGES = process.env.WAKATIME_LANGUAGES_URL ?? '';
export const WAKATIME_ACTIVITY = process.env.WAKATIME_ACTIVITY_URL ?? '';
export const WAKATIME_CODING_TIME = process.env.WAKATIME_CODING_TIME_URL ?? '';
export const WAKATIME_EDITORS = process.env.WAKATIME_EDITORS_URL ?? '';
export const WAKATIME_CODE_ACTIVITY =
  process.env.WAKATIME_CODE_ACTIVITY_URL ?? '';
const GITHUB_API_URL = process.env.GITHUB_API_URL ?? 'https://api.github.com';
const GITHUB_BASE_URL = process.env.GITHUB_BASE_URL ?? 'https://github.com';

export const GITHUB_PROFILE = (username: string) =>
  `${GITHUB_API_URL}/users/${username}`;
export const GITHUB_REPO = (username: string, repo: string) =>
  `${GITHUB_BASE_URL}/${username}/${repo}`;
