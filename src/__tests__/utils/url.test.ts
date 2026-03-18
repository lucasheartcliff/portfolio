import {
  WAKATIME_LANGUAGES,
  WAKATIME_ACTIVITY,
  WAKATIME_CODING_TIME,
  WAKATIME_EDITORS,
  WAKATIME_CODE_ACTIVITY,
  GITHUB_PROFILE,
  GITHUB_PINNED_REPO,
  GITHUB_REPO,
} from '../../utils/url';

describe('URL constants', () => {
  it('should have valid WakaTime URLs', () => {
    expect(WAKATIME_LANGUAGES).toContain('wakatime.com');
    expect(WAKATIME_ACTIVITY).toContain('wakatime.com');
    expect(WAKATIME_CODING_TIME).toContain('wakatime.com');
    expect(WAKATIME_EDITORS).toContain('wakatime.com');
    expect(WAKATIME_CODE_ACTIVITY).toContain('wakatime.com');
  });

  it('GITHUB_PROFILE should build correct URL', () => {
    expect(GITHUB_PROFILE('testuser')).toBe(
      'https://api.github.com/users/testuser'
    );
  });

  it('GITHUB_PINNED_REPO should build correct URL', () => {
    expect(GITHUB_PINNED_REPO('testuser')).toBe(
      'https://pinned.berrysauce.dev/get/testuser'
    );
  });

  it('GITHUB_REPO should build correct URL', () => {
    expect(GITHUB_REPO('testuser', 'my-repo')).toBe(
      'https://github.com/testuser/my-repo'
    );
  });
});
