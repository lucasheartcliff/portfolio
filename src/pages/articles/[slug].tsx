import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import { ClickableImage } from '@/components/ImageLightbox';
import { ACCENT, ACCENT_B, Glass, Reveal } from '@/components/portfolio/atoms';
import ThemeToggle from '@/components/portfolio/ThemeToggle';
import ReactiveBackground from '@/components/ReactiveBackground';
import { useTheme } from '@/contexts/ThemeContext';
import { Meta } from '@/layouts/Meta';
import type { DevtoArticleFull, DevtoArticleIndex } from '@/services/devto';
import { normalizeTags } from '@/services/devto';

const USERNAME = process.env.NEXT_PUBLIC_DEVTO_USERNAME || 'lucasheartcliff';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

interface Heading {
  id: string;
  label: string;
  level: number;
}

function extractHeadings(markdown: string): Heading[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const sections: Heading[] = [];
  let match = headingRegex.exec(markdown);
  while (match !== null) {
    const level = match[1]!.length;
    const label = match[2]!.replace(/\*\*|__|~~|`/g, '').trim();
    sections.push({ id: slugify(label), label, level });
    match = headingRegex.exec(markdown);
  }
  return sections;
}

function textOf(children: React.ReactNode): string {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return String(children);
  if (Array.isArray(children)) return children.map(textOf).join('');
  if (React.isValidElement(children) && children.props)
    return textOf((children.props as { children?: React.ReactNode }).children);
  return '';
}

function heading(level: number) {
  const H = ({ children }: { children?: React.ReactNode }) => {
    const id = slugify(textOf(children));
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;
    return <Tag id={id}>{children}</Tag>;
  };
  H.displayName = `H${level}`;
  return H;
}

const CodeBlock = ({ children }: { children?: React.ReactNode }) => {
  const [copied, setCopied] = useState(false);
  const text = textOf(children);
  const copy = () => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <Glass
      className="code-block my-7 overflow-hidden"
      style={{ borderRadius: 12 }}
    >
      <div className="flex items-center justify-between border-b border-hairline px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
        </div>
        <button
          type="button"
          onClick={copy}
          className="font-mono text-[10.5px] text-faint transition hover:text-fg"
        >
          {copied ? '✓ copied' : 'copy'}
        </button>
      </div>
      <pre
        className="overflow-x-auto p-4 font-mono text-[12.5px] leading-[1.65] text-soft"
        style={{ background: 'var(--code-bg)' }}
      >
        {children}
      </pre>
    </Glass>
  );
};

const markdownComponents = {
  h1: heading(1),
  h2: heading(2),
  h3: heading(3),
  h4: heading(4),
  h5: heading(5),
  h6: heading(6),
  img: ({ src, alt }: { src?: string; alt?: string }) => (
    <ClickableImage src={src} alt={alt} />
  ),
  pre: ({ children }: { children?: React.ReactNode }) => (
    <CodeBlock>{children}</CodeBlock>
  ),
};

const FONT_MIN = 14;
const FONT_MAX = 22;
const FONT_DEFAULT = 17;

const ReadingProgress = ({ accent }: { accent: string }) => {
  const { t } = useTranslation('common');
  const [p, setP] = useState(0);
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const h = document.documentElement;
        const pct = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
        setP(Math.max(0, Math.min(1, pct)));
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div>
      <div className="mb-1.5 flex justify-between font-mono text-[10px] uppercase tracking-widest text-faint">
        <span>{t('article.reading', { defaultValue: 'Reading' })}</span>
        <span>{Math.round(p * 100)}%</span>
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-chip">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${p * 100}%`, background: accent }}
        />
      </div>
    </div>
  );
};

const TocAside = ({
  toc,
  accent,
  fontSize,
  setFontSize,
}: {
  toc: Heading[];
  accent: string;
  fontSize: number;
  setFontSize: (v: number) => void;
}) => {
  const { t } = useTranslation('common');
  const [active, setActive] = useState(toc[0]?.id ?? '');
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        let cur = toc[0]?.id ?? '';
        toc.forEach((item) => {
          const el = document.getElementById(item.id);
          if (el && el.getBoundingClientRect().top < 200) cur = item.id;
        });
        setActive(cur);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [toc]);

  if (!toc.length) return null;

  return (
    <aside
      className="fixed right-8 top-32 z-40 hidden w-64 xl:block"
      style={{ maxHeight: 'calc(100vh - 160px)', overflowY: 'auto' }}
    >
      <Glass className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="font-mono text-[10.5px] uppercase tracking-widest text-faint">
            {t('article.contents', { defaultValue: 'Contents' })}
          </div>
          <div className="flex items-center gap-1 font-mono text-[10.5px]">
            <button
              type="button"
              onClick={() => setFontSize(Math.max(FONT_MIN, fontSize - 1))}
              className="h-6 w-6 rounded bg-chip text-muted transition hover:text-fg"
              aria-label="Decrease font"
            >
              A−
            </button>
            <button
              type="button"
              onClick={() => setFontSize(Math.min(FONT_MAX, fontSize + 1))}
              className="h-6 w-6 rounded bg-chip text-muted transition hover:text-fg"
              aria-label="Increase font"
            >
              A+
            </button>
          </div>
        </div>
        <ul className="space-y-1.5">
          {toc.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id} style={{ paddingLeft: (item.level - 1) * 8 }}>
                <a
                  href={`#${item.id}`}
                  className="relative block py-1 pl-3 text-[12.5px] leading-snug transition-colors"
                  style={{
                    color: isActive
                      ? 'var(--text-strong)'
                      : 'var(--text-faint)',
                    borderLeft: `2px solid ${
                      isActive ? accent : 'var(--hairline)'
                    }`,
                  }}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
        <div className="mt-5 border-t border-hairline pt-4">
          <ReadingProgress accent={accent} />
        </div>
      </Glass>
    </aside>
  );
};

const ArticleNav = ({ accent }: { accent: string }) => {
  const { t } = useTranslation('common');
  const [open, setOpen] = useState(false);
  const items: [string, string][] = [
    [t('nav.about', { defaultValue: 'About' }), '/#about'],
    [t('nav.architecture', { defaultValue: 'Architecture' }), '/#architecture'],
    [t('nav.projects', { defaultValue: 'Projects' }), '/#projects'],
    [t('nav.writing', { defaultValue: 'Writing' }), '/#writing'],
  ];

  useEffect(() => {
    if (!open) return undefined;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* Desktop nav */}
      <nav
        className="glass-nav fixed left-1/2 top-4 z-50 hidden -translate-x-1/2 items-center gap-1 rounded-full p-2 lg:flex"
        style={{ maxWidth: 'calc(100vw - 32px)' }}
      >
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- full reload reloads i18n */}
        <a
          href="/"
          className="flex items-center gap-2 py-1 pl-3 pr-2 hover:opacity-90"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke={accent}
            strokeWidth="2"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: accent, boxShadow: `0 0 12px ${accent}` }}
          />
          <span className="font-mono text-[13px] tracking-tight text-fg">
            lucasheartcliff
          </span>
        </a>
        <div className="ml-1 flex items-center gap-0.5">
          {items.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="rounded-full px-3 py-1.5 text-[12.5px] text-soft transition-colors hover:text-fg"
              style={
                label === t('nav.writing', { defaultValue: 'Writing' })
                  ? { color: accent }
                  : {}
              }
            >
              {label}
            </a>
          ))}
        </div>
        <ThemeToggle />
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- full reload reloads i18n */}
        <a
          href="/#contact"
          className="ml-1 rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition-all"
          style={{
            background: `linear-gradient(135deg, ${accent}, ${accent}aa)`,
            color: '#0b1020',
            boxShadow: `0 4px 24px ${accent}44`,
          }}
        >
          {t('cta.hireMe', { defaultValue: 'Hire me' })}
        </a>
      </nav>

      {/* Mobile top bar */}
      <nav className="glass-nav fixed inset-x-3 top-3 z-50 flex items-center justify-between rounded-full p-2 lg:hidden">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- full reload reloads i18n */}
        <a
          href="/"
          className="flex items-center gap-2 py-1 pl-2 hover:opacity-90"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke={accent}
            strokeWidth="2"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: accent, boxShadow: `0 0 10px ${accent}` }}
          />
          <span className="font-mono text-[12.5px] tracking-tight text-fg">
            lucasheartcliff
          </span>
        </a>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="flex h-9 w-9 items-center justify-center rounded-full"
            style={{
              background: 'var(--toggle-bg)',
              border: '1px solid var(--toggle-border)',
              color: accent,
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div
          className="fixed inset-0 z-[60] lg:hidden"
          onClick={() => setOpen(false)}
          role="presentation"
        >
          <div
            className="absolute inset-0"
            style={{
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(8px)',
            }}
          />
          <div
            className="glass-nav absolute inset-y-0 right-0 flex w-[82vw] max-w-sm flex-col"
            style={{
              borderRadius: '16px 0 0 16px',
              background: 'color-mix(in srgb, var(--bg-base) 96%, transparent)',
            }}
            onClick={(e) => e.stopPropagation()}
            role="presentation"
          >
            <div
              className="flex items-center justify-between border-b p-5"
              style={{ borderColor: 'var(--hairline)' }}
            >
              <span className="font-mono text-[13px] text-fg">menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-full"
                style={{
                  background: 'var(--toggle-bg)',
                  border: '1px solid var(--toggle-border)',
                  color: 'var(--text-mute)',
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <div className="flex flex-col gap-1">
                {items.map(([label, href], i) => (
                  <a
                    key={label}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg p-3 text-[15px] text-fg transition-colors"
                    style={{
                      background: i === 0 ? 'var(--chip-bg)' : 'transparent',
                    }}
                  >
                    <span
                      className="mr-3 font-mono text-[10px]"
                      style={{ color: accent }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {label}
                  </a>
                ))}
              </div>
            </div>
            <div
              className="flex items-center gap-3 border-t p-5"
              style={{ borderColor: 'var(--hairline)' }}
            >
              <ThemeToggle />
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- full reload reloads i18n */}
              <a
                href="/#contact"
                onClick={() => setOpen(false)}
                className="w-full rounded-full px-4 py-2 text-center text-[12.5px] font-medium"
                style={{
                  background: `linear-gradient(135deg, ${accent}, ${accent}aa)`,
                  color: '#0b1020',
                }}
              >
                {t('cta.hireMe', { defaultValue: 'Hire me' })}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Related = ({
  articles,
  accent,
  accentB,
  locale,
}: {
  articles: DevtoArticleIndex[];
  accent: string;
  accentB: string;
  locale: string;
}) => {
  const { t } = useTranslation('common');
  if (!articles.length) return null;
  return (
    <section className="mx-auto max-w-5xl px-6 pb-24">
      <div className="mb-8 flex items-center gap-3">
        <span
          className="font-mono text-xs uppercase tracking-[0.2em]"
          style={{ color: accent }}
        >
          {t('article.relatedLabel', { defaultValue: 'more' })}
        </span>
        <span className="h-px w-12" style={{ background: `${accent}88` }} />
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          {t('article.relatedTitle', { defaultValue: 'Recent writing' })}
        </span>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {articles.slice(0, 3).map((a, i) => {
          const tags = normalizeTags(a);
          return (
            <a key={a.id} href={`/articles/${a.slug}`} className="block">
              <Glass className="proj-card cursor-pointer p-5">
                <div
                  className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.18em]"
                  style={{ color: i % 2 === 0 ? accent : accentB }}
                >
                  #{tags[0] || 'Article'}
                </div>
                <div className="mb-4 font-display text-[17px] leading-snug tracking-tight text-fg">
                  {a.title}
                </div>
                <div className="flex items-center justify-between font-mono text-[11px] text-faint">
                  <span>
                    {new Date(a.published_at).toLocaleDateString(locale, {
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                  <span>
                    {a.reading_time_minutes} {t('min read')}
                  </span>
                </div>
              </Glass>
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default function ArticlePage() {
  const router = useRouter();
  const { slug } = router.query;
  const { t } = useTranslation('common');
  const { theme } = useTheme();
  const [article, setArticle] = useState<DevtoArticleFull | null>(null);
  const [related, setRelated] = useState<DevtoArticleIndex[]>([]);
  const [loading, setLoading] = useState(true);
  const [fontSize, setFontSizeState] = useState(FONT_DEFAULT);

  useEffect(() => {
    const saved = Number(localStorage.getItem('article-font-size'));
    if (!Number.isNaN(saved) && saved >= FONT_MIN && saved <= FONT_MAX)
      setFontSizeState(saved);
  }, []);

  const setFontSize = useCallback((v: number) => {
    setFontSizeState(v);
    localStorage.setItem('article-font-size', String(v));
  }, []);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`/api/articles/${slug}`)
      .then((res) => (res.ok ? res.json() : null))
      .then(setArticle)
      .catch(() => setArticle(null))
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    fetch('/api/articles')
      .then((res) => (res.ok ? res.json() : []))
      .then((list: DevtoArticleIndex[]) =>
        setRelated(
          [...list]
            .filter((a) => a.slug !== slug)
            .sort(
              (a, b) =>
                new Date(b.published_at).getTime() -
                new Date(a.published_at).getTime()
            )
        )
      )
      .catch(() => {});
  }, [slug]);

  const toc = useMemo(
    () =>
      article?.body_markdown ? extractHeadings(article.body_markdown) : [],
    [article?.body_markdown]
  );

  const shell = (children: React.ReactNode, meta?: React.ReactNode) => (
    <>
      {meta}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
      >
        {t('a11y.skipToContent', { defaultValue: 'Skip to content' })}
      </a>
      <div
        className="relative min-h-screen overflow-x-hidden"
        style={{ background: 'var(--bg-base)' }}
      >
        <ReactiveBackground
          accent={ACCENT}
          accentB={ACCENT_B}
          density={32}
          intensity={0.4}
          dim={theme === 'light' ? 0.4 : 1}
        />
        <div className="relative" style={{ zIndex: 10 }}>
          <ArticleNav accent={ACCENT} />
          <main id="main-content">{children}</main>
        </div>
      </div>
    </>
  );

  if (loading)
    return shell(
      <div className="flex min-h-screen items-center justify-center">
        <p className="font-mono text-faint">{t('Loading...')}</p>
      </div>,
      <Meta title="Loading..." description="" locale="en" />
    );

  if (!article)
    return shell(
      <div className="flex min-h-screen items-center justify-center">
        <p className="font-mono text-faint">{t('Article not found.')}</p>
      </div>,
      <Meta title="Article Not Found" description="" locale="en" />
    );

  const tags = normalizeTags(article);
  const ogImage = article.social_image || article.cover_image;
  const locale = (router.query.locale as string) || 'en';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: ogImage,
    datePublished: article.published_at,
    author: {
      '@type': 'Person',
      name: 'Lucas Morais',
      url: `https://dev.to/${USERNAME}`,
    },
  };

  return shell(
    <>
      <Head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <header className="px-5 pb-10 pt-28 sm:px-6 sm:pb-12 sm:pt-32">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- full reload reloads i18n */}
            <a
              href="/"
              className="mb-8 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-widest text-faint transition hover:text-fg"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              {t('cta.backToPortfolio', { defaultValue: 'back to portfolio' })}
            </a>
          </Reveal>

          <Reveal delay={60}>
            <div className="mb-6 flex flex-wrap items-center gap-3">
              {tags[0] && (
                <span
                  className="rounded px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.18em]"
                  style={{
                    color: ACCENT,
                    background: `${ACCENT}11`,
                    border: `1px solid ${ACCENT}44`,
                  }}
                >
                  #{tags[0]}
                </span>
              )}
              <span className="font-mono text-[11px] text-faint">
                {new Date(article.published_at).toLocaleDateString(locale, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}{' '}
                · {article.reading_time_minutes} {t('min read')}
              </span>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="mb-6 font-display text-[clamp(30px,7vw,64px)] leading-[1.05] tracking-[-0.025em] text-fg">
              {article.title}
            </h1>
          </Reveal>

          {article.description && (
            <Reveal delay={180}>
              <p className="max-w-2xl text-[16px] leading-relaxed text-soft sm:text-[18px]">
                {article.description}
              </p>
            </Reveal>
          )}

          <Reveal delay={240}>
            <div className="mt-8 flex items-center gap-4 border-t border-hairline pt-6">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full font-display text-sm"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_B})`,
                  color: '#0b1020',
                }}
              >
                LM
              </div>
              <div>
                <div className="text-[14px] text-fg">Lucas Morais</div>
                <div className="font-mono text-[12px] text-faint">
                  Software Engineer · Backend &amp; Architecture
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </header>

      {article.cover_image && (
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <Glass className="overflow-hidden p-1.5">
            <ClickableImage
              src={article.cover_image}
              alt={article.title}
              className="h-56 w-full rounded-xl object-cover sm:h-80"
            />
          </Glass>
        </div>
      )}

      <div className="relative">
        <article
          className="prose-body mx-auto max-w-3xl px-5 py-12 sm:px-6 sm:py-16"
          style={{ fontSize: `${fontSize}px`, lineHeight: 1.75 }}
        >
          <ReactMarkdown components={markdownComponents}>
            {article.body_markdown}
          </ReactMarkdown>
        </article>
        <TocAside
          toc={toc}
          accent={ACCENT}
          fontSize={fontSize}
          setFontSize={setFontSize}
        />
      </div>

      <Related
        articles={related}
        accent={ACCENT}
        accentB={ACCENT_B}
        locale={locale}
      />
    </>,
    <Meta
      title={article.title}
      description={article.description}
      locale="en"
      canonical={article.canonical_url}
      image={ogImage || undefined}
    />
  );
}

const i18nextConfig = require('../../../next-i18next.config');

export const getStaticPaths = () => ({ paths: [], fallback: 'blocking' });

export const getStaticProps = async () => ({
  props: {
    ...(await serverSideTranslations(i18nextConfig.i18n.defaultLocale, [
      'common',
    ])),
  },
});
