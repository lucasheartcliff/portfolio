import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import TechStack from '@/components/TechStack';

describe('TechStack', () => {
  const data = {
    Backend: ['Java', 'Spring Boot', 'Node.js'],
    Frontend: ['React', 'TypeScript'],
  };

  it('should render category headings', () => {
    render(<TechStack data={data} />);
    expect(screen.getByText('Backend')).toBeInTheDocument();
    expect(screen.getByText('Frontend')).toBeInTheDocument();
  });

  it('should render tech names', () => {
    render(<TechStack data={data} />);
    expect(screen.getByText('Java')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('should render images for each tech', () => {
    render(<TechStack data={data} />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(5);
  });

  it('should hide image on error', () => {
    render(<TechStack data={data} />);
    const images = screen.getAllByRole('img');
    fireEvent.error(images[0]!);
    expect(images[0]).toHaveStyle({ display: 'none' });
  });
});
