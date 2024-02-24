const NextI18Next = require('next-i18next').default;
const path = require('path');

module.exports = new NextI18Next({
  defaultLanguage: 'en-us',
  otherLanguages: [
    'pt-br', // Portuguese (Brazil)
    'en-us', // English (USA)
    'fr-fr', // French (France)
    'es-es', // Spanish (Spain)
    'ko-ko', // Korean (South Korea)
    'ja-ja', // Japanese (Japan)
    'de-de', // German (Germany)
    'it-it', // Italian (Italy)
    'zh-cn', // Chinese (Simplified, Mainland China)
    'ar-sa', // Arabic
  ],
  localePath: path.resolve('./public/locales'),
});
