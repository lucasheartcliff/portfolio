import { render, screen } from '@testing-library/react';
import React from 'react';

import Icon from '@/components/Icon';

describe('Icon', () => {
  it('should render children', () => {
    render(
      <Icon color="#000">
        <span data-testid="child">icon</span>
      </Icon>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('should apply the background color', () => {
    render(
      <Icon color="#0e76a8">
        <span data-testid="icon-child">icon</span>
      </Icon>
    );
    // eslint-disable-next-line testing-library/no-node-access
    const wrapper = screen.getByTestId('icon-child').parentElement;
    expect(wrapper).toHaveStyle({ backgroundColor: '#0e76a8' });
  });
});
