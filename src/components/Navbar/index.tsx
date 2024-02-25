import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import Link from '@/components/Link';

import LanguageSelector from '../LanguageSelector';
import Logo from '../logo';

interface Props {
  logoTitle: string;
}

export default function Navbar({ logoTitle }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const { t } = useTranslation('common');

  return (
    <nav className="sticky top-0 z-50 bg-white p-4 px-6 text-white no-underline shadow-md md:px-16">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/" className={'text-primary hover:border-0'}>
            <Logo title={logoTitle} />
          </Link>
          <div className="hidden space-x-4 md:flex md:text-xl">
            <Link href="#about">{t('About')}</Link>
            <Link href="#experience">{t('Experiences')}</Link>
            <Link href="#education">{t('Educations')}</Link>
            <Link href="#certification">{t('Certifications')}</Link>
            <Link href="#projects">{t('Projects')}</Link>
            <LanguageSelector />
          </div>
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            <svg
              className="h-6 w-6 fill-current text-gray-600"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 5h16a1 1 0 010 2H4a1 1 0 010-2zm0 5h16a1 1 0 010 2H4a1 1 0 010-2z"
              />
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="mt-4 md:hidden">
            <div className="flex flex-col space-y-4 text-lg">
              <Link href="#about">{t('About')}</Link>
              <Link href="#experience">{t('Experiences')}</Link>
              <Link href="#education">{t('Educations')}</Link>
              <Link href="#certification">{t('Certifications')}</Link>
              <Link href="#projects">{t('Projects')}</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
