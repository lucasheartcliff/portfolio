import {
  GithubOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  MailOutlined,
  TwitterOutlined,
  WhatsAppOutlined,
} from '@ant-design/icons';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

import CertificateCard from '@/components/CertificateCard';
import Footer from '@/components/Footer';
import Icon from '@/components/Icon';
import { SocialLink } from '@/components/Link';
import ProjectGrid from '@/components/ProjectGrid';
import Scroll from '@/components/Scroll';
import Timeline from '@/components/Timeline';
import Block from '@/layouts/Block';
import { Meta } from '@/layouts/Meta';
import Row from '@/layouts/Row';
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

const LanguageChart = dynamic(() => import('@/components/LanguageChart'), {
  ssr: false,
});
const Index = () => {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [language, setLanguage] = useState<string>('en');
  const [pinnedRepos, setPinnedRepos] = useState<any[]>([]);

  const { t } = useTranslation('common');
  const currentLocale = router.query.locale;

  const scrollTo = (titleId: string) => {
    const element = document.getElementById(titleId);
    if (!element) return;
    element.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    const l = currentLocale as string;
    setLocale(
      l,
      () => {
        console.info(`Change locale to '${l}'`);
        setLanguage(l);
      },
      () => {}
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
  useEffect(() => {
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
      .catch((err) => console.error(err));
  }, []);
  return (
    <>
      <Main
        title={logoTitle}
        scrollTo={scrollTo}
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
                  <h1 className="text-4xl font-bold text-black md:text-7xl">
                    {t(name)}
                  </h1>
                  <h2 className="text-xl font-semibold italic text-black md:text-4xl ">
                    {`@${t(username)}`}
                  </h2>
                  <p className="my-5 text-pretty text-justify text-xl text-gray-600 md:text-3xl">
                    {t(introductionBio)}
                  </p>
                  <div className="flex flex-1 flex-row items-center justify-start text-3xl text-black hover:no-underline">
                    <SocialLink href={`https://github.com/${username}`}>
                      <Icon color={'#000000'}>
                        <GithubOutlined />
                      </Icon>
                    </SocialLink>
                    <SocialLink
                      href={`https://api.whatsapp.com/send?phone=${phone}`}
                    >
                      <Icon color={'#25D366'}>
                        <WhatsAppOutlined />
                      </Icon>
                    </SocialLink>
                    <SocialLink href={`https://x.com/${username}`}>
                      <Icon color={'#00acee'}>
                        <TwitterOutlined />
                      </Icon>
                    </SocialLink>
                    <SocialLink href={`https://linkedin.com/in/${username}`}>
                      <Icon color={'#0e76a8'}>
                        <LinkedinOutlined />
                      </Icon>
                    </SocialLink>
                    <SocialLink href={`https://instagram.com/${username}`}>
                      <Icon color={'#dd2a7b'}>
                        <InstagramOutlined />
                      </Icon>
                    </SocialLink>
                    <SocialLink href={`mailto:${email}`} skipLocaleHandling>
                      <Icon color={'#d44638'}>
                        <MailOutlined />
                      </Icon>
                    </SocialLink>
                  </div>
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
                  <div>
                    <div
                      className="h-80 w-80 rounded-full bg-cover"
                      style={{
                        backgroundImage: `url(${router.basePath}/assets/images/profile.jpeg)`,
                      }}
                    />
                  </div>
                </div>
              </Block>
              <Block>
                <div className="flex flex-1 flex-col">
                  <span
                    id="about"
                    className="mb-3 text-xl font-semibold text-black md:text-4xl "
                  >
                    {t('About')}
                  </span>
                  <p className="text-pretty text-justify text-lg text-gray-600 md:text-2xl">
                    {t(bio)}
                  </p>
                </div>
              </Block>
            </Row>

            <Row>
              <Block>
                <div className="flex flex-1 flex-col ">
                  <span
                    id="languages"
                    className="mb-3 text-xl font-semibold text-black md:text-4xl "
                  >
                    {t('Languages')}
                  </span>
                  <LanguageChart data={data} />
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
                  <span
                    id="experience"
                    className="mb-3 text-xl font-semibold text-black md:text-4xl "
                  >
                    {t('Experiences')}
                  </span>
                  <Scroll style={{ height: 500 }}>
                    <Timeline data={experience} />
                  </Scroll>
                </div>
              </Block>
            </Row>
            <Row>
              <Block>
                <div className="flex flex-1 flex-col">
                  <span
                    id="education"
                    className="mb-3 text-xl font-semibold text-black md:text-4xl "
                  >
                    {t('Educations')}
                  </span>
                  <Scroll style={{ height: 500 }}>
                    <Timeline data={education} />
                  </Scroll>
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
                  <span
                    id="certification"
                    className="mb-3 text-xl font-semibold text-black md:text-4xl "
                  >
                    {t('Certifications')}
                  </span>
                  <Scroll style={{ height: 400 }}>
                    {certification?.map((v, key) => (
                      <div key={key} className="">
                        <CertificateCard key={key} {...v} />
                      </div>
                    ))}
                  </Scroll>
                </div>
              </Block>
            </Row>
            <Row>
              <Block>
                <div className="flex flex-1 flex-col">
                  <span
                    id="projects"
                    className="mb-3 text-xl font-semibold text-black md:text-4xl "
                  >
                    {t('Projects')}
                  </span>
                  <ProjectGrid
                    initialItemsCount={8}
                    itemsToAdd={8}
                    items={pinnedRepos}
                  />
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
