import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import profile from '@/public/assets/jsons/profile.json';
import { getEnvProperties } from '@/utils';

type IMetaProps = {
  title: string;
  description: string;
  locale: string;
};

const Meta = (props: IMetaProps) => {
  const router = useRouter();
  const { url } = getEnvProperties();

  return (
    <>
      <Head>
        <meta charSet="UTF-8" key="charset" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
          key="viewport"
        />
        <link
          rel="stylesheet"
          href={`${router.basePath}/assets/css/index.css`}
        />
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
        canonical={url}
        openGraph={{
          profile: {
            firstName: profile.firstName,
            lastName: profile.lastName,
            username: profile.username,
          },
          title: props.title,
          description: props.description,
          url,
          locale: props.locale,
          site_name: props.title,
        }}
      />
    </>
  );
};

export { Meta };
