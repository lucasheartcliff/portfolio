import { render, screen, fireEvent } from '@testing-library/react';
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
    const { container } = render(
      <Logo title="Test" onClick={handleClick} />
    );
    fireEvent.click(container.firstChild as HTMLElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
