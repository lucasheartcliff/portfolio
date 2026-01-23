/** @type {import('next-i18next').UserConfig} */

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: [
      'pt', // Portuguese (Brazil)
      'en', // English (USA)
      'fr', // French (France)
      'es', // Spanish (Spain)
      'de', // German (Germany)
      'it', // Italian (Italy)
    ],
    localeDetection: true,
    reloadOnPrerender: process.env.NODE_ENV === 'development',
  },
};
