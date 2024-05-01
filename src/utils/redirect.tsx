import { useRouter } from 'next/router';
import { useEffect } from 'react';

import languageDetector from './languageDetector';

export const useRedirect = (url: string = '') => {
  const router = useRouter();
  const to = url || router.asPath;

  useEffect(() => {
    const detectedLng = languageDetector.detect() || '';
    if (to.startsWith(`/${detectedLng}`) && router.route === '/404') {
      // prevent endless loop
      router.replace(`/${detectedLng}${router.route}`);
      return;
    }
    const { cache } = languageDetector;

    if (cache) cache(detectedLng);
    router.replace(`/${detectedLng}${to}`);
  });

  return <></>;
};

export const Redirect = () => {
  useRedirect();
  return <></>;
};

// eslint-disable-next-line react/display-name
export const getRedirect = (to: string) => () => {
  useRedirect(to);
  return <></>;
};
