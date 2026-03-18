import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import DarkModeToggle from '@/components/DarkModeToggle';

describe('DarkModeToggle', () => {
  it('should render a button with accessible label', () => {
    render(<DarkModeToggle isDark={false} toggle={jest.fn()} />);
    expect(screen.getByLabelText('Toggle dark mode')).toBeInTheDocument();
  });

  it('should call toggle when clicked', () => {
    const toggle = jest.fn();
    render(<DarkModeToggle isDark={false} toggle={toggle} />);
    fireEvent.click(screen.getByLabelText('Toggle dark mode'));
    expect(toggle).toHaveBeenCalledTimes(1);
  });
});
