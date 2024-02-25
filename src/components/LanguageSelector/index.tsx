import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useMemo, useState } from 'react';

import Link from '../Link';

interface FlagIconProps {
  countryCode: string;
}

function FlagIcon({ countryCode = '' }: FlagIconProps) {
  const clazz = `fi-${countryCode}`;
  return (
    <span
      className={`fi fis ${clazz} mr-2 inline-block h-6 w-6 rounded-full text-2xl`}
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
  { name: 'Korean', key: 'kr', locale: 'ko' }, // Korean (South Korea)
  { name: 'Japanese', key: 'jp', locale: 'ja' }, // Japanese (Japan)
  { name: 'German', key: 'de', locale: 'de' }, // German (Germany)
  { name: 'Italian', key: 'it', locale: 'it' }, // Italian (Italy)
  { name: 'Chinese', key: 'cn', locale: 'zh' }, // Chinese (Simplified, Mainland China)
  { name: 'Arabic', key: 'sa', locale: 'ar' }, // Arabic (Saudi Arabia)
];

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { locale } = router.query;
  const { t } = useTranslation();

  const languages: Language[] = useMemo(
    () => locales.map((c) => ({ ...c, name: t(c.name) })),

    [locale]
  );
  console.log(languages, locale);

  const selectedLanguage = useMemo(
    () => languages.find((l) => l.locale === locale),
    [locale]
  );
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
      <div className="z-40 flex items-center">
        <div className="relative inline-block text-left">
          <div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex w-full items-center justify-center rounded-md  bg-white px-4 py-2 text-sm font-medium text-gray-700"
              id={LANGUAGE_SELECTOR_ID}
              aria-haspopup="true"
              aria-expanded={isOpen}
            >
              <FlagIcon countryCode={selectedLanguage.key} />
            </button>
          </div>
          {isOpen && (
            <div
              className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="language-selector"
            >
              <div className="grid grid-cols-1 py-1" role="none">
                {languages.map((language, index) => {
                  return (
                    <button
                      key={language.key}
                      // onClick={() => setIsOpen(false)}
                      className={`${
                        selectedLanguage.key === language.key
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-700'
                      } inline-flex items-center px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                        index % 2 === 0 ? 'rounded-r' : 'rounded-l'
                      }`}
                      role="menuitem"
                    >
                      <Link href={`/${language.locale}`} skipLocaleHandling>
                        <FlagIcon countryCode={language.key} />
                        <span className="truncate">{language.name}</span>
                      </Link>
                    </button>
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
