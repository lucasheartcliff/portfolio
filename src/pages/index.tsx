import type { GetServerSideProps } from 'next';

const i18nextConfig = require('../../next-i18next.config');

function resolveLocale(acceptLanguage: string | undefined): string {
  const { locales, defaultLocale } = i18nextConfig.i18n;
  if (!acceptLanguage) return defaultLocale;

  const preferred = acceptLanguage
    .split(',')
    .map((part) => part.trim().split(';')[0]!.toLowerCase());

  for (const lang of preferred) {
    const exact = locales.find((loc: string) => loc.toLowerCase() === lang);
    if (exact) return exact;

    const base = lang.split('-')[0]!;
    const partial = locales.find((loc: string) => loc.toLowerCase() === base);
    if (partial) return partial;
  }

  return defaultLocale;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const locale = resolveLocale(req.headers['accept-language']);

  return {
    redirect: {
      destination: `/${locale}/`,
      permanent: false,
    },
  };
};

export default function Index() {
  return null;
}
