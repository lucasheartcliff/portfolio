import { render, screen } from '@testing-library/react';
import React from 'react';

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

import Reveal from '@/components/Reveal';

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
    const { container } = render(
      <Reveal width="fit-content">
        <div>content</div>
      </Reveal>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveStyle({ width: 'fit-content' });
  });

  it('should default to 100% width', () => {
    const { container } = render(
      <Reveal>
        <div>content</div>
      </Reveal>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveStyle({ width: '100%' });
  });
});
