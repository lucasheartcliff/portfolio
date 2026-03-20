import {
  GITHUB_PINNED_REPO,
  GITHUB_PROFILE,
  GITHUB_REPO,
} from '../../utils/url';

describe('URL constants', () => {
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
