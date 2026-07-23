import { render, screen } from '@testing-library/react';
import React from 'react';

import { ThemeProvider } from '@/contexts/ThemeContext';
import Index from '@/pages/[locale]/index';

const translations: Record<string, string> = {
  'hero.available': 'Available for new roles',
  'hero.line1': 'Line one',
  'hero.line2': 'Line two',
  'hero.line3': 'Line three',
  'hero.viewProjects': 'View Projects',
  'hero.downloadCV': 'Download CV',
  'hero.scroll': 'Scroll',
  'hero.bio': 'Building systems.',
  'role.0': 'Backend Engineer',
  'role.1': 'Platform Engineer',
  'role.2': 'Systems Architect',
  'role.3': 'Problem Solver',
};

jest.mock('next-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => translations[key] ?? key }),
}));

jest.mock('next/router', () => ({
  useRouter: () => ({ query: { locale: 'en' }, basePath: '' }),
}));

describe('Index page', () => {
  beforeEach(() => {
    global.fetch = jest
      .fn()
      .mockResolvedValue({ ok: true, json: async () => [] });
  });

  it('renders the hero headline and the primary nav', () => {
    render(
      <ThemeProvider>
        <Index />
      </ThemeProvider>
    );
    expect(screen.getByText('Line one')).toBeInTheDocument();
    expect(screen.getAllByText('lucasheartcliff').length).toBeGreaterThan(0);
  });

  it('renders every top-level section landmark', () => {
    render(
      <ThemeProvider>
        <Index />
      </ThemeProvider>
    );
    ['about', 'architecture', 'stack', 'contact'].forEach((id) => {
      // eslint-disable-next-line testing-library/no-node-access
      expect(document.getElementById(id)).toBeInTheDocument();
    });
  });

  it('fetches articles, GitHub repos, and WakaTime stats on mount', () => {
    render(
      <ThemeProvider>
        <Index />
      </ThemeProvider>
    );
    const urls = (global.fetch as jest.Mock).mock.calls.map((c) => c[0]);
    expect(urls).toEqual(
      expect.arrayContaining([
        '/api/articles',
        '/api/github/repos',
        '/api/wakatime/coding-time',
        '/api/wakatime/languages',
      ])
    );
  });
});
