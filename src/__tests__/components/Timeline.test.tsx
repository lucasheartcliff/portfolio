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

import Timeline from '@/components/Timeline';

describe('Timeline', () => {
  const data = [
    {
      title: 'Intelie',
      startDate: '2020-02-01T00:00:00.000Z',
      children: [
        {
          title: 'Senior Software Engineer',
          startDate: '2021-12-01T00:00:00.000Z',
          description: 'Led multiple projects',
          techTags: ['Java', 'React'],
        },
        {
          title: 'Junior Software Engineer',
          startDate: '2020-07-01T00:00:00.000Z',
          endDate: '2021-12-01T00:00:00.000Z',
          description: 'Developed features',
          techTags: ['Java'],
        },
      ],
    },
    {
      title: 'Grupo Fratelli',
      startDate: '2016-12-01T00:00:00.000Z',
      endDate: '2019-12-01T00:00:00.000Z',
      description: 'Built warehouse management system',
      techTags: ['PHP', 'JavaScript'],
    },
  ];

  it('should render parent timeline entries', () => {
    render(<Timeline data={data} />);
    expect(screen.getByText('Intelie')).toBeInTheDocument();
    expect(screen.getByText('Grupo Fratelli')).toBeInTheDocument();
  });

  it('should render child timeline entries', () => {
    render(<Timeline data={data} />);
    expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Junior Software Engineer')).toBeInTheDocument();
  });

  it('should render tech tags', () => {
    render(<Timeline data={data} />);
    expect(screen.getAllByText('Java').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('should handle empty data', () => {
    const { container } = render(<Timeline data={[]} />);
    expect(container).toBeInTheDocument();
  });

  it('should toggle child nodes when parent is clicked', () => {
    render(<Timeline data={data} />);
    expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Intelie'));
  });
});
