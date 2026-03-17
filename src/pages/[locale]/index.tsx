import {
  DownloadOutlined,
  GithubOutlined,
  LinkedinOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { Collapse, Tooltip } from 'antd';
import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

import ArticleGrid from '@/components/ArticleGrid';
import CertificateCard from '@/components/CertificateCard';
import Footer from '@/components/Footer';
import Icon from '@/components/Icon';
import { SocialLink } from '@/components/Link';
import LoadingScreen from '@/components/LoadingScreen';
import ProjectGrid from '@/components/ProjectGrid';
import Reveal from '@/components/Reveal';
import Scroll from '@/components/Scroll';
import TechStack from '@/components/TechStack';
import Timeline from '@/components/Timeline';
import TypedRole from '@/components/TypedRole';
import Block from '@/layouts/Block';
import { Meta } from '@/layouts/Meta';
import Row from '@/layouts/Row';
import profile from '@/public/assets/jsons/profile.json';
import { apiFetch } from '@/services';
import type { DevtoArticleIndex } from '@/services/devto';
import { fetchArticles } from '@/services/devto';
import { Main } from '@/templates/Main';
import { capitalize, isProgrammingLanguage, setLocale } from '@/utils';
import { getStaticPaths, makeStaticProps } from '@/utils/getStatic';
import {
  GITHUB_PINNED_REPO,
  GITHUB_REPO,
  WAKATIME_CODING_TIME,
  WAKATIME_LANGUAGES,
} from '@/utils/url';

const LanguageChart = dynamic(() => import('@/components/LanguageChart'), {
  ssr: false,
});

const Index = () => {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [language, setLanguage] = useState<string>('en');
  const [pinnedRepos, setPinnedRepos] = useState<any[]>([]);
  const [articles, setArticles] = useState<DevtoArticleIndex[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    introductionBio,
    bio,
    email,
    experience,
    education,
    certification,
    techStack,
  } = profile as any;
  const name = `${firstName} ${lastName}`.trim();
  useEffect(() => {
    fetchArticles(username)
      .then(setArticles)
      .catch(() => {});

    Promise.all([
      apiFetch(GITHUB_PINNED_REPO(username)).get(),
      apiFetch(WAKATIME_CODING_TIME).getJsonP(),
      apiFetch(WAKATIME_LANGUAGES).getJsonP(),
    ])
      .then((responses) => {
        return responses.map((r) => r.json());
      })
      .then(async ([repos, codingTime, languages]: any[]) => {
        const r = (await repos) as any;
        const c = (await codingTime) as any;
        const langs = (await languages) as any;
        setPinnedRepos(
          r.map((v: any) => ({
            ...v,
            url: GITHUB_REPO(username, v.name),
            name: capitalize(v.name?.replace(/-/g, ' ')),
            description: v.description || '',
            tags: v.topics || [],
          }))
        );
        const totalSeconds =
          c.data?.grand_total?.total_seconds_including_other_language || 0;

        // Fixing data percentage
        const totalPercentage =
          langs.data?.reduce((acc: number, curr: any) => {
            let a = acc;
            if (isProgrammingLanguage(curr.name)) a += curr.percent;
            return a;
          }, 0) || 100;

        const langData = [];
        for (const l of langs.data || []) {
          if (!isProgrammingLanguage(l.name) || !l.percent) continue;
          langData.push({
            ...l,
            value: (l.percent / totalPercentage) * totalSeconds,
          });
        }
        setData(langData);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      })
      .finally(() => {
        setTimeout(() => setIsLoading(false), 2000); // Wait 2s to show off the loading animation
      });
  }, []);
  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" name={name} />}
      </AnimatePresence>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name,
              jobTitle: 'Senior Software Engineer',
              url: 'https://lucasheartcliff.com.br',
              email: email,
              sameAs: [
                `https://github.com/${username}`,
                `https://linkedin.com/in/${username}`,
              ],
            }),
          }}
        />
      </Head>
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
          <div className="mx-2 md:mx-14">
            <Row>
              <Block>
                <div className="flex flex-col">
                  <Reveal>
                    <h1 className="text-4xl font-bold text-black dark:text-white md:text-7xl">
                      {t(name)}
                    </h1>
                  </Reveal>
                  <Reveal delay={0.35}>
                    <h2 className="text-xl font-semibold text-black dark:text-gray-200 md:text-4xl">
                      <TypedRole />
                    </h2>
                  </Reveal>
                  <Reveal delay={0.4}>
                    <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      {t('Available for opportunities')}
                    </span>
                  </Reveal>
                  <Reveal delay={0.45}>
                    <p className="my-5 text-pretty text-left text-xl text-gray-600 dark:text-gray-400 md:text-3xl">
                      {t(introductionBio)}
                    </p>
                  </Reveal>
                  <Reveal delay={0.55}>
                    <div className="flex flex-1 flex-row items-center justify-start text-3xl text-black dark:text-white hover:no-underline">
                      <SocialLink
                        title="GitHub"
                        href={`https://github.com/${username}`}
                      >
                        <Icon color={'#000000'}>
                          <GithubOutlined />
                        </Icon>
                      </SocialLink>
                      {/* <SocialLink href={`https://x.com/${username}`}> 
                      <Icon color={'#00acee'}> 
                        <TwitterOutlined /> 
                      </Icon> 
                    </SocialLink>  */}
                      <SocialLink
                        title="LinkedIn"
                        href={`https://linkedin.com/in/${username}`}
                      >
                        <Icon color={'#0e76a8'}>
                          <LinkedinOutlined />
                        </Icon>
                      </SocialLink>
                      {/* <SocialLink
                      title="Instagram"
                      href={`https://instagram.com/${username}`}
                    >
                      <Icon color={'#dd2a7b'}>
                        <InstagramOutlined />
                      </Icon>
                    </SocialLink> */}
                      <SocialLink
                        title="Email"
                        href={`mailto:${email}`}
                        skipLocaleHandling
                      >
                        <Icon color={'#d44638'}>
                          <MailOutlined />
                        </Icon>
                      </SocialLink>
                      <div className="cursor-pointer rounded hover:no-underline">
                        <Tooltip
                          className="hover:no-underline"
                          title="Download CV"
                        >
                          <a
                            href={`${router.basePath}/assets/pdfs/CV ATS Model.pdf`}
                            download="Lucas_Morais_Resume.pdf"
                            className="hover:no-underline"
                          >
                            <Icon color={'#0e76a8'}>
                              <DownloadOutlined />
                            </Icon>
                          </a>
                        </Tooltip>
                      </div>
                    </div>
                  </Reveal>
                  <Reveal delay={0.65}>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        onClick={() => {
                          const el = document.getElementById('projects');
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="rounded-lg bg-primary px-6 py-3 text-base font-semibold text-white transition-colors hover:border-0 hover:opacity-90"
                      >
                        {t('View Projects')}
                      </button>
                      <a
                        href={`${router.basePath}/assets/pdfs/CV ATS Model.pdf`}
                        download="Lucas_Morais_Resume.pdf"
                        className="rounded-lg border-2 border-primary px-6 py-3 text-base font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
                      >
                        {t('Download CV')}
                      </a>
                    </div>
                  </Reveal>
                </div>
              </Block>
              <Block>
                <div className="hidden w-full items-center justify-center md:flex ">
                  <div
                    className=" border-0 bg-cover"
                    style={{
                      height: '30rem',
                      width: '32rem',
                      backgroundImage: `url(${router.basePath}/assets/images/cover.png)`,
                    }}
                  />
                </div>
              </Block>
            </Row>
            <Row>
              <Block>
                <div className="mt-5 flex w-full items-center justify-center md:mt-0">
                  <Image
                    src={`${router.basePath}/assets/images/profile.jpeg`}
                    alt={name}
                    width={320}
                    height={320}
                    className="h-80 w-80 rounded-full object-cover"
                    priority
                  />
                </div>
              </Block>
              <Block>
                <div className="flex flex-1 flex-col">
                  <Reveal>
                    <>
                      <h3
                        id="about"
                        className="mb-3 text-xl font-semibold text-black dark:text-white md:text-4xl"
                      >
                        {t('About')}
                      </h3>
                      <p className="text-pretty text-left text-lg text-gray-600 dark:text-gray-400 md:text-2xl">
                        {t(bio)}
                      </p>
                    </>
                  </Reveal>
                </div>
              </Block>
            </Row>

            <Row>
              <Block>
                <div className="flex flex-1 flex-col ">
                  <Reveal>
                    <>
                      <h3
                        id="languages"
                        className="mb-3 text-xl font-semibold text-black dark:text-white md:text-4xl"
                      >
                        {t('Languages')}
                      </h3>
                      <LanguageChart data={data} />
                    </>
                  </Reveal>
                </div>
              </Block>
              <Block>
                <div className="hidden w-full items-center justify-center md:flex ">
                  <div
                    className=" border-0 bg-cover"
                    style={{
                      height: '36rem',
                      width: '36rem',
                      backgroundImage: `url(${router.basePath}/assets/images/languages.png)`,
                    }}
                  />
                </div>
              </Block>
            </Row>
            <Row>
              <Block>
                <div className="flex flex-1 flex-col">
                  <Reveal>
                    <>
                      <h3
                        id="tech-stack"
                        className="mb-3 text-xl font-semibold text-black dark:text-white md:text-4xl"
                      >
                        {t('Tech Stack')}
                      </h3>
                      <TechStack data={techStack} />
                    </>
                  </Reveal>
                </div>
              </Block>
            </Row>
            <Row>
              <Block>
                <div className="hidden w-full justify-center md:flex ">
                  <div
                    className=" border-0 bg-cover"
                    style={{
                      height: '36rem',
                      width: '36rem',
                      backgroundImage: `url(${router.basePath}/assets/images/experience.png)`,
                    }}
                  />
                </div>
              </Block>
              <Block>
                <div className="flex flex-1 flex-col ">
                  <Reveal>
                    <>
                      <h3
                        id="experience"
                        className="mb-3 text-xl font-semibold text-black dark:text-white md:text-4xl"
                      >
                        {t('Experience')}
                      </h3>
                      <Scroll style={{ height: 500 }}>
                        <Timeline data={experience} />
                      </Scroll>
                    </>
                  </Reveal>
                </div>
              </Block>
            </Row>
            <Row>
              <Block>
                <div className="flex flex-1 flex-col">
                  <Reveal>
                    <>
                      <h3
                        id="education"
                        className="mb-3 text-xl font-semibold text-black dark:text-white md:text-4xl"
                      >
                        {t('Education')}
                      </h3>
                      <Scroll style={{ height: 500 }}>
                        <Timeline data={education} />
                      </Scroll>
                    </>
                  </Reveal>
                </div>
              </Block>
              <Block>
                <div className="mt-10 hidden w-full items-center justify-center md:flex ">
                  <div
                    className=" border-0 bg-cover"
                    style={{
                      height: '36rem',
                      width: '36rem',
                      backgroundImage: `url(${router.basePath}/assets/images/education.png)`,
                    }}
                  />
                </div>
              </Block>
            </Row>
            <Row>
              <Block>
                <div className="mt-5 hidden w-full items-center justify-center md:flex ">
                  <div
                    className=" border-0 bg-cover"
                    style={{
                      height: '28rem',
                      width: '36rem',
                      backgroundImage: `url(${router.basePath}/assets/images/certificate.png)`,
                    }}
                  />
                </div>
              </Block>
              <Block>
                <div className="flex flex-1 flex-col">
                  <Reveal>
                    <>
                      <h3
                        id="certification"
                        className="mb-3 text-xl font-semibold text-black dark:text-white md:text-4xl "
                      >
                        {t('Certifications')}
                      </h3>
                      <Collapse
                        defaultActiveKey={['certifications', 'courses']}
                        ghost
                        items={[
                          {
                            key: 'certifications',
                            label: (
                              <span className="text-lg font-semibold text-black dark:text-white">
                                {t('Certifications')}
                              </span>
                            ),
                            children: (
                              <div>
                                {certification
                                  ?.filter((v: any) => v.type === 'certification')
                                  .map((v: any, key: number) => (
                                    <CertificateCard key={key} {...v} />
                                  ))}
                              </div>
                            ),
                          },
                          {
                            key: 'courses',
                            label: (
                              <span className="text-lg font-semibold text-black dark:text-white">
                                {t('Courses')}
                              </span>
                            ),
                            children: (
                              <div>
                                {certification
                                  ?.filter((v: any) => v.type === 'course')
                                  .map((v: any, key: number) => (
                                    <CertificateCard key={key} {...v} />
                                  ))}
                              </div>
                            ),
                          },
                        ]}
                      />
                    </>
                  </Reveal>
                </div>
              </Block>
            </Row>
            {articles.length > 0 && (
              <Row>
                <Block>
                  <div className="flex flex-1 flex-col">
                    <Reveal>
                      <>
                        <h3
                          id="articles"
                          className="mb-3 text-xl font-semibold text-black dark:text-white md:text-4xl"
                        >
                          {t('Articles')}
                        </h3>
                        <ArticleGrid articles={articles.slice(0, 6)} />
                      </>
                    </Reveal>
                  </div>
                </Block>
              </Row>
            )}
            <Row>
              <Block>
                <div className="flex flex-1 flex-col">
                  <Reveal>
                    <>
                      <h3
                        id="projects"
                        className="mb-3 text-xl font-semibold text-black dark:text-white md:text-4xl"
                      >
                        {t('Projects')}
                      </h3>
                      <ProjectGrid
                        initialItemsCount={8}
                        itemsToAdd={8}
                        items={pinnedRepos}
                      />
                    </>
                  </Reveal>
                </div>
              </Block>
            </Row>
          </div>
          <Footer />
        </>
      </Main>
    </>
  );
};

export default Index;
const getStaticProps = makeStaticProps(['common']);
export { getStaticPaths, getStaticProps };
