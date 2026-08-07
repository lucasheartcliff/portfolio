import { render, screen } from '@testing-library/react';
import React from 'react';

import type { LanguageDatum } from '@/components/portfolio/Languages';
import LanguagesSection from '@/components/portfolio/Languages';

jest.mock('next-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('next/router', () => ({
  useRouter: () => ({ query: { locale: 'en' } }),
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

  it('formats the per-language time with translated unit labels', () => {
    render(<LanguagesSection data={data} />);
    // 4000h and 2500h are both over a year (2080h/yr), so the "years" key
    // (translated, not the hardcoded "yr") should back the displayed unit.
    expect(screen.getAllByText(/years$/).length).toBeGreaterThan(0);
  });

  describe('locale-aware number formatting', () => {
    const originalMock = jest.requireMock('next/router').useRouter;

    afterEach(() => {
      jest.requireMock('next/router').useRouter = originalMock;
    });

    it('formats decimals and totals using the active locale, not "."/"," hardcoded', () => {
      jest.requireMock('next/router').useRouter = () => ({
        query: { locale: 'de' },
      });
      render(<LanguagesSection data={data} />);
      // German uses "," as the decimal separator and "." as the thousands
      // separator — 4000h / 2080h per year ≈ 1,9 years, and the 6500h total
      // should read "6.500", not the en-US "6,500".
      expect(screen.getByText(/1,9\s*years/)).toBeInTheDocument();
      expect(screen.getByText('6.500')).toBeInTheDocument();
    });
  });
});
