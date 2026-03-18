import { render, screen } from '@testing-library/react';
import React from 'react';

import ColorfulDot from '@/components/ColorfulDot';

describe('ColorfulDot', () => {
  it('should render the label text', () => {
    render(<ColorfulDot color="#ff0000" label="TypeScript" />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('should apply the background color to the dot', () => {
    const { container } = render(
      <ColorfulDot color="#2b7489" label="TypeScript" />
    );
    const dot = container.querySelector('.rounded-full');
    expect(dot).toHaveStyle({ background: '#2b7489' });
  });
});
