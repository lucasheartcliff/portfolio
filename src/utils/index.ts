import moment from 'moment';

export const secondToHours = (value: number) => value * (1 / 3600);
export const formatTime = (seconds: number) => {
  const days = Math.floor(seconds / (24 * 60 * 60));
  const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));

  const formattedTime = `${days} days ${hours} hours`;
  return formattedTime;
};
export const capitalize = (text: string) => {
  if (!text) return '';
  return text
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const languageColors: { [key: string]: string } = {
  C: '#555555',
  'C++': '#f34b7d',
  JAVA: '#b07219',
  PYTHON: '#3572A5',
  JAVASCRIPT: '#f1e05a',
  HTML: '#e34c26',
  CSS: '#563d7c',
  RUBY: '#701516',
  SWIFT: '#ffac45',
  KOTLIN: '#F18E33',
  GO: '#00ADD8',
  TYPESCRIPT: '#2b7489',
  PHP: '#4F5D95',
  MATLAB: '#e16737',
  PERL: '#0298c3',
  R: '#198ce7',
  SHELL: '#89e051',
  SQL: '#e38c33',
  RUST: '#dea584',
  LUA: '#000080',
};

export const getLanguageColor = (lang: string) =>
  languageColors[lang?.toUpperCase()] || '#000000';

export const isProgrammingLanguage = (lang: string) => {
  return lang ? lang.toUpperCase() in languageColors : false;
};

const platformsColor: { [k: string]: string } = {
  ALURA: '#5ea3d0',
  UDEMY: '#A435F0',
  CISCO: '#049fd9',
  OTHERS: '#049fd9',
};

export const getPlatformColor = (platform: string) => {
  const p = platform.toUpperCase();
  return p in platformsColor ? platformsColor[p] : platformsColor.OTHERS;
};

export function mapLocaleToMoment(i18nLocale: string | undefined) {
  const localeMap: { [k: string]: string } = {
    pt: 'pt-br',
    en: 'en',
    fr: 'fr',
    es: 'es',
    ko: 'ko',
    ja: 'ja',
    de: 'de',
    it: 'it',
    zh: 'zh-cn',
    ar: 'ar-sa',
  };
  const i = i18nLocale || 'en';

  return i in localeMap ? localeMap[i] : localeMap.en; // Default to English if no matching locale found
}

export async function setLocale(
  locale: string | undefined,
  onSuccess: Function,
  onError: Function
): Promise<void> {
  const momentLocale = (await mapLocaleToMoment(locale)) as string;
  if (!locale || locale === 'en') {
    moment.locale(locale);
  }
  return import(`moment/locale/${momentLocale}`)
    .then(({ default: localeData }) => {
      moment.locale(momentLocale);
      onSuccess();
    })
    .catch((e) => {
      console.error('Error while importing locale module: ', e);
      onError(e);
    });
}

export const getEnvProperties = () => ({
  url: process.env.NEXT_PUBLIC_URL || '',
  googleAnalytics: process.env.NEXT_PUBLIC_ANALYTICS_ID || '',
});
