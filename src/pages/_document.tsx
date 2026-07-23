/* eslint-disable no-underscore-dangle */
import Document, { Head, Html, Main, NextScript } from 'next/document';

const i18nextConfig = require('../../next-i18next.config');
// Need to create a custom _document because i18n support is not compatible with `next export`.
class MyDocument extends Document {
  // eslint-disable-next-line class-methods-use-this
  render() {
    const currentLocale =
      this.props.__NEXT_DATA__.query.locale || i18nextConfig.i18n.defaultLocale;

    return (
      <Html lang={currentLocale}>
        <>
          <Head>
            <script
              // Resolve the theme before first paint to avoid a flash:
              // stored preference wins, otherwise fall back to the OS setting.
              dangerouslySetInnerHTML={{
                __html: `(function(){try{var s=localStorage.getItem('theme');var t=(s==='light'||s==='dark')?s:((window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches)?'light':'dark');var r=document.documentElement;r.setAttribute('data-theme',t);r.classList.toggle('dark',t==='dark');}catch(e){}})();`,
              }}
            />
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </>
      </Html>
    );
  }
}

export default MyDocument;
