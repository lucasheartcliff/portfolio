import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import ScrollToTopButton from '@/components/ScrollToTopButton';

describe('ScrollToTopButton', () => {
  it('should be visible when isVisible is true', () => {
    render(<ScrollToTopButton isVisible={true} scrollToTop={jest.fn()} />);
    expect(screen.getByLabelText('Scroll to top')).toBeInTheDocument();
  });

  it('should be invisible when isVisible is false', () => {
    render(<ScrollToTopButton isVisible={false} scrollToTop={jest.fn()} />);
    expect(screen.queryByLabelText('Scroll to top')).not.toBeInTheDocument();
  });

  it('should call scrollToTop when clicked', () => {
    const scrollToTop = jest.fn();
    render(<ScrollToTopButton isVisible={true} scrollToTop={scrollToTop} />);
    fireEvent.click(screen.getByLabelText('Scroll to top'));
    expect(scrollToTop).toHaveBeenCalledTimes(1);
  });
});
