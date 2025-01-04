
"use client"
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

import { Meta } from '@/layouts/Meta';
import profile from '@/public/assets/jsons/profile.json';
import { apiFetch } from '@/services';
import { Main } from '@/templates/Main';
import { capitalize, isProgrammingLanguage, setLocale } from '@/utils';
import { getStaticPaths, makeStaticProps } from '@/utils/getStatic';
import {
  GITHUB_PINNED_REPO,
  GITHUB_REPO,
  WAKATIME_CODING_TIME,
  WAKATIME_LANGUAGES,
} from '@/utils/url';
const CurriculumVitae = dynamic(() => import('@/templates/pdf/CurriculumVitae'), { ssr: false });
const Index = () => {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [language, setLanguage] = useState<string>('en');
  const [pinnedRepos, setPinnedRepos] = useState<any[]>([]);

  const { t } = useTranslation('common');
  const currentLocale = router.query.locale;

  useEffect(() => {
    const l = currentLocale as string;
    setLocale(
      l,
      () => {
        // eslint-disable-next-line no-console
        console.info(`Change locale to '${l}'`);
        setLanguage(l);
      },
      () => { }
    );
  }, [currentLocale]);

  const {
    firstName,
    lastName,
    username,
    logoTitle,
    phone,
    introductionBio,
    bio,
    email,
    experience,
    education,
    certification,
  } = profile;
  const name = `${firstName} ${lastName}`.trim();
  return (
    <>
      <Main
        title={logoTitle}
        meta={
          <Meta
            title={name}
            description={t(introductionBio)}
            locale={language}
          />
        }
      >
        <>
          <CurriculumVitae />
        </>
      </Main>
    </>
  );
};

export default Index;
const getStaticProps = makeStaticProps(['common']);
export { getStaticPaths, getStaticProps };
