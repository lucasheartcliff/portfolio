import { render, screen } from '@testing-library/react';
import React from 'react';

import LoadingScreen from '@/components/LoadingScreen';

describe('LoadingScreen', () => {
  it('should render the name', () => {
    render(<LoadingScreen name="Lucas Morais" />);
    expect(screen.getByText('Lucas Morais')).toBeInTheDocument();
  });

  it('should render without name', () => {
    const { container } = render(<LoadingScreen />);
    expect(container).toBeInTheDocument();
  });
});
