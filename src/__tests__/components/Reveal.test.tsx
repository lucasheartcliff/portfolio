import { render, screen } from '@testing-library/react';
import React from 'react';

import Reveal from '@/components/Reveal';

// Mock IntersectionObserver for framer-motion useInView
beforeAll(() => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

describe('Reveal', () => {
  it('should render children', () => {
    render(
      <Reveal>
        <div data-testid="child">content</div>
      </Reveal>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('should accept custom width prop', () => {
    render(
      <Reveal width="fit-content">
        <div data-testid="reveal-fit">content</div>
      </Reveal>
    );
    /* eslint-disable testing-library/no-node-access */
    const outerWrapper =
      screen.getByTestId('reveal-fit').parentElement?.parentElement;
    /* eslint-enable testing-library/no-node-access */
    expect(outerWrapper).toHaveStyle({ width: 'fit-content' });
  });

  it('should default to 100% width', () => {
    render(
      <Reveal>
        <div data-testid="reveal-default">content</div>
      </Reveal>
    );
    /* eslint-disable testing-library/no-node-access */
    const outerWrapper =
      screen.getByTestId('reveal-default').parentElement?.parentElement;
    /* eslint-enable testing-library/no-node-access */
    expect(outerWrapper).toHaveStyle({ width: '100%' });
  });
});
