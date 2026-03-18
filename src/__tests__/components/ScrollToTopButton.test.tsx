import { render, fireEvent } from '@testing-library/react';
import React from 'react';

import ScrollToTopButton from '@/components/ScrollToTopButton';

describe('ScrollToTopButton', () => {
  it('should be visible when isVisible is true', () => {
    const { container } = render(
      <ScrollToTopButton isVisible={true} scrollToTop={jest.fn()} />
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).not.toContain('invisible');
  });

  it('should be invisible when isVisible is false', () => {
    const { container } = render(
      <ScrollToTopButton isVisible={false} scrollToTop={jest.fn()} />
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('invisible');
  });

  it('should call scrollToTop when clicked', () => {
    const scrollToTop = jest.fn();
    const { container } = render(
      <ScrollToTopButton isVisible={true} scrollToTop={scrollToTop} />
    );
    fireEvent.click(container.firstChild as HTMLElement);
    expect(scrollToTop).toHaveBeenCalledTimes(1);
  });
});
