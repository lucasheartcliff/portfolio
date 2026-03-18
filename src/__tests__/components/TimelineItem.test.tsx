import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

jest.mock('react-markdown', () => {
  return {
    __esModule: true,
    default: ({ children, className }: any) => (
      <div className={className}>{children}</div>
    ),
  };
});

jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

import Item from '@/components/Timeline/Item';

describe('Timeline Item', () => {
  const defaultProps = {
    title: 'Software Engineer',
    open: true,
    startDate: '2020-01-01T00:00:00.000Z',
    endDate: '2022-01-01T00:00:00.000Z',
    description: 'Built amazing things',
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

  it('should render description when open', () => {
    render(<Item {...defaultProps} />);
    expect(screen.getByText('Built amazing things')).toBeInTheDocument();
  });

  it('should call onClickToOpen when clicked', () => {
    const onClickToOpen = jest.fn();
    render(<Item {...defaultProps} onClickToOpen={onClickToOpen} />);
    fireEvent.click(screen.getByText('Software Engineer'));
    expect(onClickToOpen).toHaveBeenCalled();
  });

  it('should not call onClickToOpen when there is no description', () => {
    const onClickToOpen = jest.fn();
    render(
      <Item
        {...defaultProps}
        description={undefined}
        onClickToOpen={onClickToOpen}
      />
    );
    fireEvent.click(screen.getByText('Software Engineer'));
    expect(onClickToOpen).not.toHaveBeenCalled();
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
