import { render, screen } from '@testing-library/react';
import React from 'react';

import Row from '@/layouts/Row';

describe('Row', () => {
  it('should render children', () => {
    render(
      <Row>
        <div data-testid="child">content</div>
      </Row>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});
