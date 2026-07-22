import { render, screen } from '@testing-library/react';
import React from 'react';

import type { ProjectDatum } from '@/components/portfolio/Projects';
import ProjectsSection from '@/components/portfolio/Projects';

jest.mock('next-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

const project: ProjectDatum = {
  name: 'cool-repo',
  desc: 'A cool repo',
  tags: ['typescript', 'nextjs'],
  stars: 12,
  forks: 3,
  lang: 'TypeScript',
  langColor: '#2b7489',
  url: 'https://github.com/octocat/cool-repo',
  featured: true,
};

describe('ProjectsSection', () => {
  it('renders nothing when there are no projects', () => {
    const { container } = render(<ProjectsSection projects={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders a project card with its stats, tags, and link', () => {
    render(<ProjectsSection projects={[project]} username="octocat" />);
    expect(screen.getByText('cool-repo')).toBeInTheDocument();
    expect(screen.getByText('A cool repo')).toBeInTheDocument();
    expect(screen.getByText('typescript')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();

    // eslint-disable-next-line testing-library/no-node-access
    const link = screen.getByText('cool-repo').closest('a');
    expect(link).toHaveAttribute(
      'href',
      'https://github.com/octocat/cool-repo'
    );
  });

  it('links "all repos" to the given username GitHub profile', () => {
    render(<ProjectsSection projects={[project]} username="octocat" />);
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByText('proj.allRepos').closest('a')).toHaveAttribute(
      'href',
      'https://github.com/octocat'
    );
  });
});
