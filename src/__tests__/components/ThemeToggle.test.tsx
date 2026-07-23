import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import ThemeToggle from '@/components/portfolio/ThemeToggle';
import { ThemeProvider } from '@/contexts/ThemeContext';

describe('ThemeToggle', () => {
  it('offers to switch to light while in dark mode, and flips on click', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const button = screen.getByLabelText('Switch to light theme');
    fireEvent.click(button);

    expect(screen.getByLabelText('Switch to dark theme')).toBeInTheDocument();
  });
});
