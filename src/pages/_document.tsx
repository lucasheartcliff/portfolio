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
            <link rel="stylesheet" href="/assets/css/index.css" />
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
              // Apply theme before paint to avoid a flash of the wrong theme.
              dangerouslySetInnerHTML={{
                __html: `(function(){try{var s=localStorage.getItem('darkMode');var d=s==='true'||(!s&&window.matchMedia('(prefers-color-scheme: dark)').matches);var r=document.documentElement;r.setAttribute('data-theme',d?'dark':'light');if(d){r.classList.add('dark');}else{r.classList.remove('dark');}}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`,
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
