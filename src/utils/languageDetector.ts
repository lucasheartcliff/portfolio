import languageDetector from 'next-language-detector';

const i18nextConfig = require('../../i18n');

export default languageDetector({
  fallbackLng: i18nextConfig.i18n.defaultLocale,
  supportedLngs: i18nextConfig.i18n.locales,
});
