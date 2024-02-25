import '../styles/global.css';
import 'node_modules/flag-icons/css/flag-icons.min.css';

import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default appWithTranslation(MyApp);
