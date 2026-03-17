import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import profile from '@/public/assets/jsons/profile.json';
import { getEnvProperties } from '@/utils';

type IMetaProps = {
  title: string;
  description: string;
  locale: string;
  canonical?: string;
  image?: string;
};

const Meta = (props: IMetaProps) => {
  const router = useRouter();
  const { url } = getEnvProperties();
  const canonicalUrl = props.canonical || url;

  return (
    <>
      <Head>
        <meta charSet="UTF-8" key="charset" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
          key="viewport"
        />
        <meta name="theme-color" content="#253db6" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#5c7cfa" media="(prefers-color-scheme: dark)" />

        <link
          rel="apple-touch-icon"
          href={`${router.basePath}/apple-touch-icon.png`}
          key="apple"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${router.basePath}/favicon-32x32.png`}
          key="icon32"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${router.basePath}/favicon-16x16.png`}
          key="icon16"
        />
        <link
          rel="icon"
          href={`${router.basePath}/favicon.ico`}
          key="favicon"
        />
      </Head>
      <NextSeo
        title={props.title}
        description={props.description}
        canonical={canonicalUrl}
        openGraph={{
          profile: {
            firstName: profile.firstName,
            lastName: profile.lastName,
            username: profile.username,
          },
          title: props.title,
          description: props.description,
          url: canonicalUrl,
          locale: props.locale,
          site_name: props.title,
          ...(props.image
            ? {
                images: [
                  {
                    url: props.image,
                    width: 1200,
                    height: 630,
                    alt: props.title,
                  },
                ],
              }
            : {}),
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content:
              'Lucas Morais, software engineer, full-stack developer, backend architect, portfolio, Java, Spring Boot, React, TypeScript',
          },
          {
            name: 'author',
            content: `${profile?.firstName || ''} ${profile?.lastName || ''}`,
          },
          {
            httpEquiv: 'x-ua-compatible',
            content: 'IE=edge,chrome=1',
          },
          {
            name: 'robots',
            content: 'index,follow',
          },
        ]}
      />
    </>
  );
};

export { Meta };
