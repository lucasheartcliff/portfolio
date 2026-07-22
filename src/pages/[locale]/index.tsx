import Head from 'next/head';
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

function fetchJson(url: string) {
  return fetch(url).then((res) => {
    if (!res.ok) throw new Error(`Request to ${url} failed: ${res.status}`);
    return res.json();
  });
}

const Index = () => {
  const [languages, setLanguages] = useState<LanguageDatum[]>([]);
  const [projects, setProjects] = useState<ProjectDatum[]>([]);
  const [articles, setArticles] = useState<DevtoArticleIndex[]>([]);
  const [articlesError, setArticlesError] = useState(false);
  const [dataError, setDataError] = useState(false);

  const { firstName, lastName, username, email } = profile as any;
  const name = `${firstName} ${lastName}`.trim();

  useEffect(() => {
    fetchJson('/api/articles')
      .then((fetched: DevtoArticleIndex[]) =>
        setArticles(
          [...fetched].sort(
            (a, b) =>
              new Date(b.published_at).getTime() -
              new Date(a.published_at).getTime()
          )
        )
      )
      .catch(() => setArticlesError(true));

    Promise.all([
      fetchJson('/api/github/repos'),
      fetchJson('/api/wakatime/coding-time'),
      fetchJson('/api/wakatime/languages'),
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
      .catch(() => setDataError(true));
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
          <Hero accent={ACCENT} accentB={ACCENT_B} username={username} />
          <ArchitectureSection accent={ACCENT} accentB={ACCENT_B} />
          <StackSection accent={ACCENT} accentB={ACCENT_B} />
          <LanguagesSection
            data={languages}
            error={dataError}
            accent={ACCENT}
            accentB={ACCENT_B}
          />
          <ProjectsSection
            projects={projects}
            error={dataError}
            accent={ACCENT}
            accentB={ACCENT_B}
            username={username}
          />
          <ArticlesSection
            articles={articles}
            error={articlesError}
            accent={ACCENT}
            accentB={ACCENT_B}
          />
          <ContactSection
            accent={ACCENT}
            accentB={ACCENT_B}
            email={email}
            username={username}
          />
        </div>
      </div>
    </>
  );
};

export default Index;
const getStaticProps = makeStaticProps(['common']);
export { getStaticPaths, getStaticProps };
