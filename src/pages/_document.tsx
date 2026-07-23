/* eslint-disable no-underscore-dangle */
/* eslint-disable @next/next/no-css-tags */
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
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin="anonymous"
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
              rel="stylesheet"
            />
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
