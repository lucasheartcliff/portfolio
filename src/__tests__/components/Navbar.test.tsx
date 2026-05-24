import { render, screen } from '@testing-library/react';
import React from 'react';

import Navbar from '@/components/Navbar';
import { DarkModeContext } from '@/pages/_app';

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { locale: 'en' },
    asPath: '/',
    pathname: '/[locale]',
    push: jest.fn(),
  }),
}));

jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  }),
  appWithTranslation: (component: any) => component,
}));

function renderWithDarkMode(ui: React.ReactElement) {
  return render(
    <DarkModeContext.Provider value={{ isDark: false, toggle: jest.fn() }}>
      {ui}
    </DarkModeContext.Provider>
  );
}

describe('Navbar', () => {
  it('should render the logo title', () => {
    renderWithDarkMode(<Navbar logoTitle="LucasHeartcliff" />);
    expect(screen.getByText('LucasHeartcliff')).toBeInTheDocument();
  });

  it('should render dark mode toggle', () => {
    renderWithDarkMode(<Navbar logoTitle="Test" />);
    expect(screen.getByLabelText('Toggle dark mode')).toBeInTheDocument();
  });
});
