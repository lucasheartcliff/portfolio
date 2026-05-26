import '../styles/global.css';
import 'node_modules/flag-icons/css/flag-icons.min.css';

import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/next';
import { ConfigProvider, theme } from 'antd';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import React, { createContext, useCallback, useEffect } from 'react';

import LoadingScreen from '@/components/LoadingScreen';
import { getEnvProperties } from '@/utils';

export const DarkModeContext = createContext<{
  isDark: boolean;
  toggle: () => void;
}>({ isDark: true, toggle: () => {} });

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    // Dark-only design: lock the theme.
    const root = document.documentElement;
    root.setAttribute('data-theme', 'dark');
    root.classList.add('dark');
    setLoading(false);
  }, []);

  const toggle = useCallback(() => {}, []);

  return (
    <DarkModeContext.Provider value={{ isDark: true, toggle }}>
      <ConfigProvider
        theme={{
          token: { colorPrimary: '#1d6df7' },
          algorithm: theme.darkAlgorithm,
        }}
      >
        {loading ? <LoadingScreen /> : <Component {...pageProps} />}
        <Analytics />
        <GoogleAnalytics gaId={getEnvProperties().googleAnalytics} />
      </ConfigProvider>
    </DarkModeContext.Provider>
  );
};

export default appWithTranslation(MyApp);
