import { render, screen } from '@testing-library/react';
import React from 'react';

import Block from '@/layouts/Block';

describe('Block', () => {
  it('should render children', () => {
    render(
      <Block>
        <div data-testid="child">content</div>
      </Block>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});
