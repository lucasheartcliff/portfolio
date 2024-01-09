import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import CertificateCard from '@/components/CertificateCard';
import ProjectCard from '@/components/ProjectCard';
import Timeline from '@/components/Timeline';
import Item from '@/components/Timeline/Item';
import { Meta } from '@/layouts/Meta';
import { apiFetch } from '@/services';
import { Main } from '@/templates/Main';
import { WAKATIME_LANGUAGES } from '@/utils/url';

const Index = () => {
  const router = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    apiFetch(WAKATIME_LANGUAGES)
      .get()
      .then((r) => r.json())
      .then((d) => {
        setData(d);
      })
      .catch((e) => console.error(e));
  }, []);
  const randomDataArray = [
    {
      title: 'Node1',
      startTime: '2022-01-01',
      endTime: '2022-03-15',
      children: [
        {
          title: 'Node1.1',
          startTime: '2022-02-01',
          endTime: '2022-02-28',
        },
        {
          title: 'Node1.2',
          startTime: '2022-03-01',
          endTime: '2022-03-15',
        },
      ],
    },
    {
      title: 'Node2',
      startTime: '2021-11-01',
      endTime: '2022-01-15',
    },
    {
      title: 'Node3',
      startTime: '2023-04-01',
    },
    {
      title: 'Node4',
      startTime: '2023-01-01',
      endTime: '2023-02-15',
      children: [
        {
          title: 'Node4.1',
          startTime: '2023-02-01',
          endTime: '2023-02-15',
        },
      ],
    },
    {
      title: 'Node5',
      startTime: '2022-09-01',
      endTime: '2022-12-31',
      children: [
        {
          title: 'Node5.1',
          startTime: '2022-10-01',
          endTime: '2022-11-30',
        },
        {
          title: 'Node5.2',
          startTime: '2022-12-01',
          endTime: '2022-12-31',
        },
      ],
    },
  ];
  return (
    <>
      <Main
        meta={
          <Meta
            title="Next.js Boilerplate Presentation"
            description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
          />
        }
      >
        <CertificateCard
          name={'Course 123aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'}
          platform={'udemy'}
          url={'https://google.com'}
        />
        <ProjectCard
          language="typescript"
          stars={5}
          forks={1}
          name={'Crypt Image'}
          url={''}
        />
        <Item title={'Test ltda'} startTime={'2020-01-01'} hasChildren />
        <Item
          title={'Test ltda'}
          startTime={'2020-01-01'}
          endTime={'2023-01-01'}
        />{' '}
        <Timeline data={randomDataArray} />
        <h2 className="text-2xl font-bold">
          Boilerplate code for your Nextjs project with Tailwind CSS
        </h2>
        <p>
          <span role="img" aria-label="rocket">
            🚀
          </span>{' '}
          Next.js Boilerplate is a starter code for your Next js project by
          putting developer experience first .{' '}
          <span role="img" aria-label="zap">
            ⚡️
          </span>{' '}
          Made with Next.js, TypeScript, ESLint, Prettier, Husky, Lint-Staged,
          VSCode, Netlify, PostCSS, Tailwind CSS.
        </p>
        <h3 className="text-lg font-semibold">Next js Boilerplate Features</h3>
        <p>Developer experience first:</p>
        <ul>
          <li>
            <span role="img" aria-label="fire">
              🔥
            </span>{' '}
            <a href="https://nextjs.org" rel="nofollow">
              Next.js
            </a>{' '}
            for Static Site Generator
          </li>
          <li>
            <span role="img" aria-label="art">
              🎨
            </span>{' '}
            Integrate with{' '}
            <a href="https://tailwindcss.com" rel="nofollow">
              Tailwind CSS
            </a>
          </li>
          <li>
            <span role="img" aria-label="nail_care">
              💅
            </span>{' '}
            PostCSS for processing Tailwind CSS
          </li>
          <li>
            <span role="img" aria-label="tada">
              🎉
            </span>{' '}
            Type checking Typescript
          </li>
          <li>
            <span role="img" aria-label="pencil2">
              ✏️
            </span>{' '}
            Linter with{' '}
            <a href="https://eslint.org" rel="nofollow">
              ESLint
            </a>
          </li>
          <li>
            <span role="img" aria-label="hammer_and_wrench">
              🛠
            </span>{' '}
            Code Formatter with{' '}
            <a href="https://prettier.io" rel="nofollow">
              Prettier
            </a>
          </li>
          <li>
            <span role="img" aria-label="fox_face">
              🦊
            </span>{' '}
            Husky for Git Hooks
          </li>
          <li>
            <span role="img" aria-label="no_entry_sign">
              🚫
            </span>{' '}
            Lint-staged for running linters on Git staged files
          </li>
          <li>
            <span role="img" aria-label="no_entry_sign">
              🗂
            </span>{' '}
            VSCode configuration: Debug, Settings, Tasks and extension for
            PostCSS, ESLint, Prettier, TypeScript
          </li>
          <li>
            <span role="img" aria-label="robot">
              🤖
            </span>{' '}
            SEO metadata, JSON-LD and Open Graph tags with Next SEO
          </li>
          <li>
            <span role="img" aria-label="robot">
              ⚙️
            </span>{' '}
            <a
              href="https://www.npmjs.com/package/@next/bundle-analyzer"
              rel="nofollow"
            >
              Bundler Analyzer
            </a>
          </li>
          <li>
            <span role="img" aria-label="rainbow">
              🌈
            </span>{' '}
            Include a FREE minimalist theme
          </li>
          <li>
            <span role="img" aria-label="hundred">
              💯
            </span>{' '}
            Maximize lighthouse score
          </li>
        </ul>
        <p>Built-in feature from Next.js:</p>
        <ul>
          <li>
            <span role="img" aria-label="coffee">
              ☕
            </span>{' '}
            Minify HTML &amp; CSS
          </li>
          <li>
            <span role="img" aria-label="dash">
              💨
            </span>{' '}
            Live reload
          </li>
          <li>
            <span role="img" aria-label="white_check_mark">
              ✅
            </span>{' '}
            Cache busting
          </li>
        </ul>
        <h3 className="text-lg font-semibold">Our Stater code Philosophy</h3>
        <ul>
          <li>Minimal code</li>
          <li>SEO-friendly</li>
          <li>
            <span role="img" aria-label="rocket">
              🚀
            </span>{' '}
            Production-ready
          </li>
        </ul>
        <p>
          Check our GitHub project for more information about{' '}
          <a href="https://github.com/ixartz/Next-js-Boilerplate">
            Nextjs Boilerplate
          </a>
          . You can also browse our{' '}
          <a href="https://creativedesignsguru.com/category/nextjs/">
            Premium NextJS Templates
          </a>{' '}
          on our website to support this project.
        </p>
      </Main>
    </>
  );
};

export default Index;
