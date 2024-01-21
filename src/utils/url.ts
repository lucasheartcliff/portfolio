export const WAKATIME_LANGUAGES = `https://wakatime.com/share/@lucasheartcliff/aa27a39b-9077-4411-8569-2887ac7d3cfb.json`;
export const WAKATIME_ACTIVITY = `https://wakatime.com/share/@lucasheartcliff/c5d9d32e-d588-48cf-baa4-725420fb3321.json`;
export const WAKATIME_CODING_TIME =
  'https://wakatime.com/share/@lucasheartcliff/1d8d3574-4f80-426c-9929-8213f089a012.json';
export const WAKATIME_EDITORS = `https://wakatime.com/share/@lucasheartcliff/5fc84e8d-fbe1-4a0f-998e-86fec4be7382.json`;
export const GITHUB_PROFILE = (username: string) =>
  `https://api.github.com/users/${username}`;
export const GITHUB_PINNED_REPO = (username: string) =>
  `https://pinned.berrysauce.me/get/${username}`;
export const GITHUB_REPO = (username: string, repo: string) =>
  `https://github.com/${username}/${repo}`;
