import { render, screen } from '@testing-library/react';
import React from 'react';

import type { LanguageDatum } from '@/components/portfolio/Languages';
import LanguagesSection from '@/components/portfolio/Languages';

jest.mock('next-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

const data: LanguageDatum[] = [
  { name: 'TypeScript', hours: 4000, color: '#2b7489' },
  { name: 'Java', hours: 2500, color: '#b07219' },
];

describe('LanguagesSection', () => {
  it('renders nothing with no data', () => {
    const { container } = render(<LanguagesSection data={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders each language name and its total hours', () => {
    render(<LanguagesSection data={data} />);
    expect(screen.getAllByText('TypeScript').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Java').length).toBeGreaterThan(0);
    expect(screen.getByText(/6,?500/)).toBeInTheDocument();
  });
});
