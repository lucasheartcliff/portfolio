import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import ProjectGrid from '@/components/ProjectGrid';

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { locale: 'en' },
    asPath: '/',
    pathname: '/[locale]',
  }),
}));

describe('ProjectGrid', () => {
  const items = Array.from({ length: 10 }, (_, i) => ({
    name: `Project ${i}`,
    language: 'TypeScript',
    forks: i,
    stars: i * 2,
    url: `https://github.com/test/project-${i}`,
    description: `Description ${i}`,
    tags: [],
  }));

  it('should render initial items count', () => {
    render(<ProjectGrid items={items} initialItemsCount={3} itemsToAdd={3} />);
    expect(screen.getByText('Project 0')).toBeInTheDocument();
    expect(screen.getByText('Project 2')).toBeInTheDocument();
    expect(screen.queryByText('Project 3')).not.toBeInTheDocument();
  });

  it('should show "Show more" button when there are more items', () => {
    render(<ProjectGrid items={items} initialItemsCount={3} itemsToAdd={3} />);
    expect(screen.getByText('Show more projects...')).toBeInTheDocument();
  });

  it('should show more items when "Show more" is clicked', () => {
    render(<ProjectGrid items={items} initialItemsCount={3} itemsToAdd={3} />);
    fireEvent.click(screen.getByText('Show more projects...'));
    expect(screen.getByText('Project 5')).toBeInTheDocument();
  });

  it('should not show "Show more" button when all items are visible', () => {
    render(<ProjectGrid items={items} initialItemsCount={10} itemsToAdd={5} />);
    expect(screen.queryByText('Show more projects...')).not.toBeInTheDocument();
  });
});
