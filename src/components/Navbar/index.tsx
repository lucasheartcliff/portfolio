import { useTranslation } from 'next-i18next';
import type { RefObject } from 'react';
import React, { useContext, useEffect, useState } from 'react';
import type Scrollbars from 'react-custom-scrollbars-2';

import { DarkModeContext } from '@/pages/_app';

import DarkModeToggle from '../DarkModeToggle';
import LanguageSelector from '../LanguageSelector';
import Link from '../Link';
import Logo from '../logo';

interface Props {
  logoTitle: string;
  scrollRef: RefObject<Scrollbars>;
}

export default function Navbar({ logoTitle, scrollRef }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const { t } = useTranslation('common');
  const { isDark, toggle } = useContext(DarkModeContext);

  const OPTIONS = [
    {
      title: t('About'),
      key: 'about',
    },
    {
      title: t('Languages'),
      key: 'languages',
    },
    {
      title: t('Tech Stack'),
      key: 'tech-stack',
    },
    {
      title: t('Experience'),
      key: 'experience',
    },
    {
      title: t('Education'),
      key: 'education',
    },
    {
      title: t('Certifications'),
      key: 'certification',
    },
    {
      title: t('Articles'),
      key: 'articles',
    },
    {
      title: t('Projects'),
      key: 'projects',
    },
  ];

  function getHashFromURL() {
    const urlId = window.location.hash;
    if (!urlId) return;
    const normalizedId = urlId.toLowerCase().replace(/#/g, '');
    setActiveTab(normalizedId);
  }
  function scrollTo(titleId: string) {
    const element = document.getElementById(titleId);
    if (!element) return;
    element.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => getHashFromURL(), []);

  function observeScrollPositionAndUpdateState(isOnBottom: boolean) {
    const headers = OPTIONS.map(({ key }) => key);
    if (isOnBottom) {
      const id = headers[headers.length - 1] as string;
      setActiveTab(id);
    } else {
      headers.forEach((id) => {
        const e = document.getElementById(id);
        if (!e) return;
        const rect = e.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < 100) {
          setActiveTab(id);
        }
      });
    }
  }

  useEffect(() => {
    const scroll = scrollRef.current;
    const element = scroll?.container?.firstChild;

    if (element) {
      element.addEventListener('scroll', () => {
        const position = scroll.getValues();
        const isOnBottom =
          position.scrollHeight - position.clientHeight - position.scrollTop <
          25;
        observeScrollPositionAndUpdateState(isOnBottom);
      });

      return () => element.removeEventListener('scroll', () => null);
    }
    return () => null;
  }, [scrollRef]);

  const renderOptions = () =>
    OPTIONS.map(({ title, key }) => (
      <span
        key={key}
        onClick={() => {
          scrollTo(key);
        }}
        className={`cursor-pointer  hover:border-0 ${
          activeTab === key ? 'text-primary' : 'text-black dark:text-gray-200'
        }`}
      >
        {title}
      </span>
    ));
  return (
    <nav className="sticky top-0 z-50 bg-white p-4 px-6 text-white no-underline shadow-md dark:bg-gray-900 md:px-16">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/" className={'text-primary hover:border-0'}>
            <Logo title={logoTitle} />
          </Link>
          <div className="hidden items-center space-x-4 md:flex md:text-2xl">
            {renderOptions()}
            <LanguageSelector />
            <DarkModeToggle isDark={isDark} toggle={toggle} />
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <DarkModeToggle isDark={isDark} toggle={toggle} />
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
            >
              <svg
                className="h-6 w-6 fill-current text-gray-600 dark:text-gray-300"
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
        </div>
        {menuOpen && (
          <div className="mt-4 md:hidden">
            <div className="flex flex-col justify-center space-y-4 text-center align-middle text-lg">
              {renderOptions()}
              <div className="flex w-full justify-center">
                <LanguageSelector />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
