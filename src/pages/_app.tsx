import '../styles/global.css';
import 'node_modules/flag-icons/css/flag-icons.min.css';

import { GoogleAnalytics } from '@next/third-parties/google';
import { ConfigProvider, theme } from 'antd';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import React, { createContext, useCallback, useEffect, useState } from 'react';

import LoadingScreen from '@/components/LoadingScreen';
import { getEnvProperties } from '@/utils';

export const DarkModeContext = createContext<{
  isDark: boolean;
  toggle: () => void;
}>({ isDark: false, toggle: () => {} });

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [loading, setLoading] = React.useState(true);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('darkMode');
    const prefersDark =
      stored === 'true' ||
      (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    }
    setLoading(false);
  }, []);

  const toggle = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem('darkMode', String(next));
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  }, []);

  return (
    <DarkModeContext.Provider value={{ isDark, toggle }}>
      <ConfigProvider
        theme={{
          token: { colorPrimary: isDark ? '#5c7cfa' : '#253db6' },
          algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}
      >
        {loading ? <LoadingScreen /> : <Component {...pageProps} />}
        <GoogleAnalytics gaId={getEnvProperties().googleAnalytics} />
      </ConfigProvider>
    </DarkModeContext.Provider>
  );
};

export default appWithTranslation(MyApp);
