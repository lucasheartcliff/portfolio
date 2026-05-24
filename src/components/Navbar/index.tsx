import React, { useContext } from 'react';

import { DarkModeContext } from '@/pages/_app';

import DarkModeToggle from '../DarkModeToggle';
import LanguageSelector from '../LanguageSelector';
import Link from '../Link';
import Logo from '../logo';

interface Props {
  logoTitle: string;
  showLanguageSelector?: boolean;
}

export default function Navbar({
  logoTitle,
  showLanguageSelector = true,
}: Props) {
  const { isDark, toggle } = useContext(DarkModeContext);

  return (
    <nav className="sticky top-0 z-50 bg-white p-4 px-6 text-white no-underline shadow-md dark:bg-gray-900 md:px-16">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/" className={'text-primary hover:border-0'}>
            <Logo title={logoTitle} />
          </Link>
          <div className="flex items-center space-x-4">
            {showLanguageSelector && <LanguageSelector />}
            <DarkModeToggle isDark={isDark} toggle={toggle} />
          </div>
        </div>
      </div>
    </nav>
  );
}
