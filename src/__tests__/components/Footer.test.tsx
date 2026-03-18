import { render, screen } from '@testing-library/react';
import React from 'react';

import Footer from '@/components/Footer';

jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('Footer', () => {
  it('should render "Made with" text', () => {
    render(<Footer />);
    expect(screen.getByText('Made with')).toBeInTheDocument();
  });

  it('should render author credit', () => {
    render(<Footer />);
    expect(screen.getByText('by Lucas Morais')).toBeInTheDocument();
  });
});
