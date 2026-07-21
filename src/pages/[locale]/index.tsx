import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

import ArchitectureSection from '@/components/portfolio/Architecture';
import ArticlesSection from '@/components/portfolio/Articles';
import { ACCENT, ACCENT_B } from '@/components/portfolio/atoms';
import ContactSection from '@/components/portfolio/Contact';
import Hero from '@/components/portfolio/Hero';
import type { LanguageDatum } from '@/components/portfolio/Languages';
import LanguagesSection from '@/components/portfolio/Languages';
import Nav from '@/components/portfolio/Nav';
import type { ProjectDatum } from '@/components/portfolio/Projects';
import ProjectsSection from '@/components/portfolio/Projects';
import StackSection from '@/components/portfolio/Stack';
import ReactiveBackground from '@/components/ReactiveBackground';
import { Meta } from '@/layouts/Meta';
import profile from '@/public/assets/jsons/profile.json';
import type { DevtoArticleIndex } from '@/services/devto';
import {
  getLanguageColor,
  isProgrammingLanguage,
  secondToHours,
} from '@/utils';
import { getStaticPaths, makeStaticProps } from '@/utils/getStatic';
import { GITHUB_REPO } from '@/utils/url';

const Index = () => {
  const { t } = useTranslation('common');
  const [languages, setLanguages] = useState<LanguageDatum[]>([]);
  const [projects, setProjects] = useState<ProjectDatum[]>([]);
  const [articles, setArticles] = useState<DevtoArticleIndex[]>([]);

  const { firstName, lastName, username, email } = profile as any;
  const name = `${firstName} ${lastName}`.trim();

  useEffect(() => {
    fetch('/api/articles')
      .then((res) => (res.ok ? res.json() : []))
      .then((fetched: DevtoArticleIndex[]) =>
        setArticles(
          [...fetched].sort(
            (a, b) =>
              new Date(b.published_at).getTime() -
              new Date(a.published_at).getTime()
          )
        )
      )
      .catch(() => {});

    Promise.all([
      fetch('/api/github/repos').then((r) => (r.ok ? r.json() : [])),
      fetch('/api/wakatime/coding-time').then((r) => (r.ok ? r.json() : {})),
      fetch('/api/wakatime/languages').then((r) => (r.ok ? r.json() : {})),
    ])
      .then(([repos, coding, langs]: any[]) => {
        setProjects(
          (Array.isArray(repos) ? repos : []).map((v: any) => ({
            name: v.name,
            desc: v.description || '',
            tags: (v.topics || []).slice(0, 4),
            stars: v.stars ?? 0,
            forks: v.forks ?? 0,
            lang: v.language || '',
            langColor: v.languageColor || getLanguageColor(v.language),
            url: v.url || GITHUB_REPO(username, v.name),
            featured: false,
          }))
        );

        const totalSeconds =
          coding.data?.grand_total?.total_seconds_including_other_language || 0;
        const totalPercentage =
          langs.data?.reduce((acc: number, curr: any) => {
            let a = acc;
            if (isProgrammingLanguage(curr.name)) a += curr.percent;
            return a;
          }, 0) || 100;

        const langData: LanguageDatum[] = [];
        for (const l of langs.data || []) {
          if (!isProgrammingLanguage(l.name) || !l.percent) continue;
          const seconds = (l.percent / totalPercentage) * totalSeconds;
          langData.push({
            name: l.name,
            hours: secondToHours(seconds),
            color: l.color || getLanguageColor(l.name),
          });
        }
        langData.sort((a, b) => b.hours - a.hours);
        setLanguages(langData);
      })
      .catch(() => {});
  }, [username]);

  return (
    <>
      <Meta title={name} description={profile.introductionBio} locale="en" />
      <Head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name,
              jobTitle: 'Senior Software Engineer',
              url: 'https://lucasheartcliff.com.br',
              email,
              sameAs: [
                `https://github.com/${username}`,
                `https://linkedin.com/in/${username}`,
              ],
            }),
          }}
        />
      </Head>

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
      >
        {t('a11y.skipToContent', { defaultValue: 'Skip to content' })}
      </a>

      <div
        className="relative min-h-screen overflow-x-hidden"
        style={{ background: 'var(--bg-base)' }}
      >
        <ReactiveBackground
          accent={ACCENT}
          accentB={ACCENT_B}
          density={28}
          intensity={0.55}
        />

        <div className="relative" style={{ zIndex: 10 }}>
          <Nav accent={ACCENT} />
          <main id="main-content">
            <Hero accent={ACCENT} accentB={ACCENT_B} username={username} />
            <ArchitectureSection accent={ACCENT} accentB={ACCENT_B} />
            <StackSection accent={ACCENT} accentB={ACCENT_B} />
            <LanguagesSection
              data={languages}
              accent={ACCENT}
              accentB={ACCENT_B}
            />
            <ProjectsSection
              projects={projects}
              accent={ACCENT}
              accentB={ACCENT_B}
              username={username}
            />
            <ArticlesSection
              articles={articles}
              accent={ACCENT}
              accentB={ACCENT_B}
            />
            <ContactSection
              accent={ACCENT}
              accentB={ACCENT_B}
              email={email}
              username={username}
            />
          </main>
        </div>
      </div>
    </>
  );
};

export default Index;
const getStaticProps = makeStaticProps(['common']);
export { getStaticPaths, getStaticProps };
