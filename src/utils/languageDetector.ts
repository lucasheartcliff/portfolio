import languageDetector from 'next-language-detector';

const i18nextConfig = require('../../next-i18next.config');

export default languageDetector({
  fallbackLng: i18nextConfig.i18n.defaultLocale,
  supportedLngs: i18nextConfig.i18n.locales,
});
