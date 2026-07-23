import { render, screen } from '@testing-library/react';
import React from 'react';

import {
  Glass,
  Reveal,
  SectionLabel,
  Tag,
  Trans,
} from '@/components/portfolio/atoms';

jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const dict: Record<string, string> = {
        'hero.bio': 'Building {b}scalable{/b} systems.',
      };
      return dict[key] ?? key;
    },
  }),
}));

describe('Glass', () => {
  it('renders children with the glass-card class plus any extra className', () => {
    render(<Glass className="extra">content</Glass>);
    expect(screen.getByText('content')).toHaveClass('glass-card', 'extra');
  });
});

describe('Tag', () => {
  it('renders its children', () => {
    render(<Tag accent="#123456">Kafka</Tag>);
    expect(screen.getByText('Kafka')).toBeInTheDocument();
  });
});

describe('SectionLabel', () => {
  it('renders the number and label', () => {
    render(<SectionLabel num="01" label="Architecture" />);
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('Architecture')).toBeInTheDocument();
  });
});

describe('Reveal', () => {
  it('renders its children', () => {
    render(
      <Reveal>
        <span>revealed content</span>
      </Reveal>
    );
    expect(screen.getByText('revealed content')).toBeInTheDocument();
  });
});

describe('Trans', () => {
  it('renders {b}...{/b} segments as <strong>', () => {
    render(<Trans k="hero.bio" />);
    const strong = screen.getByText('scalable');
    expect(strong.tagName).toBe('STRONG');
  });

  it('renders the surrounding text as plain text', () => {
    render(<Trans k="hero.bio" />);
    expect(screen.getByText(/Building/)).toBeInTheDocument();
    expect(screen.getByText(/systems\./)).toBeInTheDocument();
  });
});
