import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import Logo from '@/components/logo';

describe('Logo', () => {
  it('should render the title', () => {
    render(<Logo title="LucasHeartcliff" />);
    expect(screen.getByText('LucasHeartcliff')).toBeInTheDocument();
  });

  it('should render angle brackets', () => {
    render(<Logo title="Test" />);
    expect(screen.getByText('<')).toBeInTheDocument();
    expect(screen.getByText('/>')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Logo title="Test" onClick={handleClick} />);
    fireEvent.click(screen.getByText('Test'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
