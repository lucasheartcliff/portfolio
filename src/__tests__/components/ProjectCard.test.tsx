import { render, screen } from '@testing-library/react';
import React from 'react';

import ProjectCard from '@/components/ProjectCard';

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { locale: 'en' },
    asPath: '/',
    pathname: '/[locale]',
  }),
}));

describe('ProjectCard', () => {
  const defaultProps = {
    name: 'My Project',
    language: 'TypeScript',
    forks: 5,
    stars: 10,
    url: 'https://github.com/test/project',
    description: 'A test project description',
    tags: ['react', 'nextjs'],
  };

  it('should render the project name', () => {
    render(<ProjectCard {...defaultProps} />);
    expect(screen.getByText('My Project')).toBeInTheDocument();
  });

  it('should render forks and stars count', () => {
    render(<ProjectCard {...defaultProps} />);
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('should render the language label', () => {
    render(<ProjectCard {...defaultProps} />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('should render description when provided', () => {
    render(<ProjectCard {...defaultProps} />);
    expect(
      screen.getByText('A test project description')
    ).toBeInTheDocument();
  });

  it('should not render description when not provided', () => {
    const { description: _, ...propsWithoutDesc } = defaultProps;
    render(<ProjectCard {...propsWithoutDesc} />);
    expect(
      screen.queryByText('A test project description')
    ).not.toBeInTheDocument();
  });

  it('should render tags', () => {
    render(<ProjectCard {...defaultProps} />);
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByText('nextjs')).toBeInTheDocument();
  });

  it('should not render tags section when tags are empty', () => {
    render(<ProjectCard {...defaultProps} tags={[]} />);
    expect(screen.queryByText('react')).not.toBeInTheDocument();
  });
});
