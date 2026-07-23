import { render, screen } from '@testing-library/react';
import React from 'react';

import Hero from '@/components/portfolio/Hero';

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
  useRouter: () => ({ basePath: '' }),
}));

describe('Hero', () => {
  it('renders the headline lines', () => {
    render(<Hero username="octocat" />);
    expect(screen.getByText('Line one')).toBeInTheDocument();
    expect(screen.getByText('Line two')).toBeInTheDocument();
    expect(screen.getByText('Line three')).toBeInTheDocument();
  });

  it('links the primary CTA to the projects section', () => {
    render(<Hero username="octocat" />);
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByText('View Projects').closest('a')).toHaveAttribute(
      'href',
      '#projects'
    );
  });

  it('points the social links at the given username', () => {
    render(<Hero username="octocat" />);
    expect(screen.getByLabelText('GitHub')).toHaveAttribute(
      'href',
      'https://github.com/octocat'
    );
    expect(screen.getByLabelText('LinkedIn')).toHaveAttribute(
      'href',
      'https://linkedin.com/in/octocat'
    );
    expect(screen.getByLabelText('Email')).toHaveAttribute('href', '#contact');
  });

  it('renders the first rotating role', () => {
    render(<Hero username="octocat" />);
    expect(screen.getByText('Backend Engineer')).toBeInTheDocument();
  });
});
