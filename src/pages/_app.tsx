import '../styles/global.css';

import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/next';
import { ConfigProvider, theme } from 'antd';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import React, { useEffect } from 'react';

import LoadingScreen from '@/components/LoadingScreen';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { jetbrainsMono, spaceGrotesk } from '@/styles/fonts';
import { getEnvProperties } from '@/utils';

const fontVariables = `${spaceGrotesk.variable} ${jetbrainsMono.variable}`;

const AppShell = ({ Component, pageProps }: AppProps) => {
  const { theme: activeTheme } = useTheme();
  const [loading, setLoading] = React.useState(true);
  const { googleAnalytics } = getEnvProperties();

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: '#1d6df7' },
        algorithm:
          activeTheme === 'light'
            ? theme.defaultAlgorithm
            : theme.darkAlgorithm,
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

const MyApp = (props: AppProps) => (
  <ThemeProvider>
    <AppShell {...props} />
  </ThemeProvider>
);

export default appWithTranslation(MyApp);
