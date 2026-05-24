import { render, screen } from '@testing-library/react';
import React from 'react';

import CertificateCard from '@/components/CertificateCard';

jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { locale: 'en' },
    asPath: '/',
    pathname: '/[locale]',
  }),
}));

describe('CertificateCard', () => {
  it('should render certificate name', () => {
    render(
      <CertificateCard
        name="Cisco CCNA"
        platform="cisco"
        url="https://example.com"
      />
    );
    expect(screen.getByText('Cisco CCNA')).toBeInTheDocument();
  });

  it('should render platform name', () => {
    render(
      <CertificateCard
        name="Cisco CCNA"
        platform="cisco"
        url="https://example.com"
      />
    );
    expect(screen.getByText('cisco')).toBeInTheDocument();
  });
});
