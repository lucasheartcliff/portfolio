/* eslint-disable tailwindcss/no-custom-classname */
import { Tooltip } from 'antd';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';

import Link from '../Link';

interface FlagIconProps {
  countryCode: string;
}

function FlagIcon({ countryCode = '' }: FlagIconProps) {
  const clazz = `fi-${countryCode}`;
  return (
    <span
      className={`fi fis ${clazz} inline-block h-6 w-6 rounded-full text-2xl`}
    />
  );
}

export interface Language {
  key: string; // Country Code
  name: string;
  locale: string;
}

const LANGUAGE_SELECTOR_ID = 'language-selector';

const locales = [
  { name: 'Portuguese', key: 'br', locale: 'pt' }, // Portuguese (Brazil)
  { name: 'English', key: 'us', locale: 'en' }, // English (USA)
  { name: 'French', key: 'fr', locale: 'fr' }, // French (France)
  { name: 'Spanish', key: 'es', locale: 'es' }, // Spanish (Spain)
  { name: 'German', key: 'de', locale: 'de' }, // German (Germany)
  { name: 'Italian', key: 'it', locale: 'it' }, // Italian (Italy)
];

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { locale } = router.query;
  const { t } = useTranslation();

  const languages: Language[] = locales.map((c) => ({ ...c, name: t(c.name) }));

  const selectedLanguage = languages.find((l) => l.locale === locale);

  useEffect(() => {
    const handleWindowClick = (event: any) => {
      const target = event.target.closest('button');
      if (target && target.id === LANGUAGE_SELECTOR_ID) {
        return;
      }
      setIsOpen(false);
    };
    window.addEventListener('click', handleWindowClick);
    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, []);

  if (!selectedLanguage) {
    return null;
  }

  return (
    <>
      <div className="z-40 flex w-full items-center md:w-fit">
        <div className="relative inline-flex w-full justify-center text-center md:justify-start">
          <div>
            <Tooltip title={selectedLanguage.name}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex w-full items-center justify-center rounded-md bg-white py-2 text-sm font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-200 md:px-4"
                id={LANGUAGE_SELECTOR_ID}
                aria-haspopup="true"
                aria-expanded={isOpen}
              >
                <FlagIcon countryCode={selectedLanguage.key} />
              </button>
            </Tooltip>
          </div>
          {isOpen && (
            <div
              className="absolute mt-12 w-44 origin-top rounded-md bg-white shadow-lg ring-1 ring-black/5 dark:bg-gray-800 dark:ring-white/10 md:right-0 md:origin-top-right"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="language-selector"
            >
              <div
                className="grid w-full grid-cols-1 scroll-auto py-1"
                role="none"
              >
                {languages.map((language, index) => {
                  return (
                    <Link
                      key={language.key}
                      href={`/${language.locale}`}
                      skipLocaleHandling
                    >
                      <button
                        key={language.key}
                        className={`${
                          selectedLanguage.key === language.key
                            ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
                            : 'text-gray-700 dark:text-gray-300'
                        } inline-flex w-full items-center px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                          index % 2 === 0 ? 'rounded-r' : 'rounded-l'
                        }`}
                        role="menuitem"
                      >
                        <FlagIcon countryCode={language.key} />
                        <span className="ml-2 truncate">{language.name}</span>
                      </button>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
