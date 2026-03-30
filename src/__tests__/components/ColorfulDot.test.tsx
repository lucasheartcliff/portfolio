import { render, screen } from '@testing-library/react';
import React from 'react';

import ColorfulDot from '@/components/ColorfulDot';

describe('ColorfulDot', () => {
  it('should render the label text', () => {
    render(<ColorfulDot color="#ff0000" label="TypeScript" />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('should apply the background color to the dot', () => {
    render(<ColorfulDot color="#2b7489" label="TypeScript" />);
    // eslint-disable-next-line testing-library/no-node-access
    const dot = screen.getByText('TypeScript').previousElementSibling;
    expect(dot).toHaveStyle({ background: '#2b7489' });
  });
});
