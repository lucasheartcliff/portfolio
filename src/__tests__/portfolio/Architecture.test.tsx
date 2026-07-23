import { render, screen } from '@testing-library/react';
import React from 'react';

import ArchitectureSection from '@/components/portfolio/Architecture';

jest.mock('next-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe('ArchitectureSection', () => {
  it('renders the section heading', () => {
    render(<ArchitectureSection />);
    expect(screen.getByText('arch.title1')).toBeInTheDocument();
    expect(screen.getByText('arch.title2')).toBeInTheDocument();
  });

  it('renders the tech tags for each architecture card', () => {
    render(<ArchitectureSection />);
    expect(screen.getByText('Kafka')).toBeInTheDocument();
    expect(screen.getByText('DDD')).toBeInTheDocument();
    expect(screen.getByText('OAuth2')).toBeInTheDocument();
  });
});
