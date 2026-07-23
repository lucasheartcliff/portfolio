import '../styles/global.css';
import 'node_modules/flag-icons/css/flag-icons.min.css';

import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/next';
import { ConfigProvider, theme } from 'antd';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import React, { useEffect } from 'react';

import LoadingScreen from '@/components/LoadingScreen';
import { jetbrainsMono, spaceGrotesk } from '@/styles/fonts';
import { getEnvProperties } from '@/utils';

const fontVariables = `${spaceGrotesk.variable} ${jetbrainsMono.variable}`;

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [loading, setLoading] = React.useState(true);
  const { googleAnalytics } = getEnvProperties();

  useEffect(() => {
    // Dark-only design: lock the theme.
    const root = document.documentElement;
    root.setAttribute('data-theme', 'dark');
    root.classList.add('dark');
    setLoading(false);
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: '#1d6df7' },
        algorithm: theme.darkAlgorithm,
      }}
    >
      <div className={fontVariables}>
        {loading ? <LoadingScreen /> : <Component {...pageProps} />}
        <Analytics />
        {googleAnalytics && <GoogleAnalytics gaId={googleAnalytics} />}
      </div>
    </ConfigProvider>
  );
};

export default appWithTranslation(MyApp);
