import '../styles/global.css';
import 'node_modules/flag-icons/css/flag-icons.min.css';

import { GoogleAnalytics } from '@next/third-parties/google';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import React from 'react';

import LoadingScreen from '@/components/LoadingScreen';
import { getEnvProperties } from '@/utils';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? <LoadingScreen /> : <Component {...pageProps} />}
      <GoogleAnalytics gaId={getEnvProperties().googleAnalytics} />
    </>
  );
};

export default appWithTranslation(MyApp);
