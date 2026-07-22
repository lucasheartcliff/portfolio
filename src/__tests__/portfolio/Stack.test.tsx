import { render, screen } from '@testing-library/react';
import React from 'react';

import StackSection from '@/components/portfolio/Stack';

jest.mock('next-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe('StackSection', () => {
  it('renders every stack category label and a sample of items', () => {
    render(<StackSection />);
    expect(screen.getByText('stack.cat.backend')).toBeInTheDocument();
    expect(screen.getByText('stack.cat.frontend')).toBeInTheDocument();
    expect(screen.getByText('stack.cat.data')).toBeInTheDocument();
    expect(screen.getByText('stack.cat.cloud')).toBeInTheDocument();
    expect(screen.getByText('Java')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Kubernetes')).toBeInTheDocument();
  });

  it('renders the summary metrics', () => {
    render(<StackSection />);
    expect(screen.getByText('9+')).toBeInTheDocument();
    expect(screen.getByText('99.97%')).toBeInTheDocument();
  });
});
