/* eslint-disable no-underscore-dangle */
import { GoogleAnalytics } from '@next/third-parties/google';
import Document, { Head, Html, Main, NextScript } from 'next/document';

import { getEnvProperties } from '@/utils';

const i18nextConfig = require('../../next-i18next.config');
// Need to create a custom _document because i18n support is not compatible with `next export`.
class MyDocument extends Document {
  // eslint-disable-next-line class-methods-use-this
  render() {
    const { googleAnalytics: gaId } = getEnvProperties();

    const currentLocale =
      this.props.__NEXT_DATA__.query.locale || i18nextConfig.i18n.defaultLocale;

    return (
      <Html lang={currentLocale}>
        <>
          <Head />
          <body>
            <Main />
            <NextScript />
          </body>
          <GoogleAnalytics gaId={gaId} />
        </>
      </Html>
    );
  }
}

export default MyDocument;
