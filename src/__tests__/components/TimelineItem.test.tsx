import { render, screen } from '@testing-library/react';
import React from 'react';

import Item from '@/components/Timeline/Item';

jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('Timeline Item', () => {
  const defaultProps = {
    title: 'Software Engineer',
    open: true,
    startDate: '2020-01-01T00:00:00.000Z',
    endDate: '2022-01-01T00:00:00.000Z',
    techTags: ['Java', 'React'],
  };

  it('should render the title', () => {
    render(<Item {...defaultProps} />);
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
  });

  it('should render tech tags', () => {
    render(<Item {...defaultProps} />);
    expect(screen.getByText('Java')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('should show "Now" when no endDate', () => {
    render(<Item {...defaultProps} endDate={undefined} />);
    expect(screen.getByText(/Now/)).toBeInTheDocument();
  });

  it('should not render tech tags when empty', () => {
    render(<Item {...defaultProps} techTags={[]} />);
    expect(screen.queryByText('Java')).not.toBeInTheDocument();
  });
});
