import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import ScrollToTopButton from '@/components/ScrollToTopButton';

describe('ScrollToTopButton', () => {
  it('should be visible when isVisible is true', () => {
    render(<ScrollToTopButton isVisible={true} scrollToTop={jest.fn()} />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('should be invisible when isVisible is false', () => {
    const { container } = render(
      <ScrollToTopButton isVisible={false} scrollToTop={jest.fn()} />
    );
    // Component uses AnimatePresence with conditional rendering — renders nothing when not visible
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toBeNull();
  });

  it('should call scrollToTop when clicked', () => {
    const scrollToTop = jest.fn();
    const { container } = render(
      <ScrollToTopButton isVisible={true} scrollToTop={scrollToTop} />
    );
    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.click(container.firstChild as HTMLElement);
    expect(scrollToTop).toHaveBeenCalledTimes(1);
  });
});
