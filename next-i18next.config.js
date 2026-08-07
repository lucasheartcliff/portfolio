/** @type {import('next-i18next').UserConfig} */

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: [
      'pt', // Portuguese (Brazil)
      'en', // English (USA)
      'es', // Spanish
      'it', // Italian
      'fr', // French
      'de', // German
      'zh', // Chinese (Simplified)
      'ru', // Russian
      'ja', // Japanese
      'ko', // Korean
    ],
    localeDetection: true,
    reloadOnPrerender: process.env.NODE_ENV === 'development',
  },
};
