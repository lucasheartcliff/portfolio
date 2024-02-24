/** @type {import('next-i18next').UserConfig} */

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: [
      'pt', // Portuguese (Brazil)
      'en', // English (USA)
      'fr', // French (France)
      'es', // Spanish (Spain)
      'ko', // Korean (South Korea)
      'ja', // Japanese (Japan)
      'de', // German (Germany)
      'it', // Italian (Italy)
      'zh', // Chinese (Simplified, Mainland China)
      'ar', // Arabic
    ],
    localeDetection: true,
    reloadOnPrerender: process.env.NODE_ENV === 'development',
  },
};
