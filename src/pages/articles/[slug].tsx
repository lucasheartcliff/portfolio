import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import type { AsideSection } from '@/components/AsideNav';
import AsideNav from '@/components/AsideNav';
import { Meta } from '@/layouts/Meta';
import type { DevtoArticleFull } from '@/services/devto';
import { normalizeTags } from '@/services/devto';
import { Main } from '@/templates/Main';

const USERNAME = process.env.NEXT_PUBLIC_DEVTO_USERNAME || 'lucasheartcliff';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function extractHeadings(markdown: string): AsideSection[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const sections: AsideSection[] = [];
  let match = headingRegex.exec(markdown);
  while (match !== null) {
    const level = match[1]!.length;
    const label = match[2]!.replace(/\*\*|__|~~|`/g, '').trim();
    sections.push({
      key: slugify(label),
      label,
      level,
    });
    match = headingRegex.exec(markdown);
  }
  return sections;
}

function extractTextFromChildren(children: React.ReactNode): string {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return String(children);
  if (Array.isArray(children))
    return children.map(extractTextFromChildren).join('');
  if (React.isValidElement(children) && children.props) {
    return extractTextFromChildren(
      (children.props as { children?: React.ReactNode }).children
    );
  }
  return '';
}

/** Custom heading renderer that adds id attributes for scroll anchoring */
function createHeadingRenderer(level: number) {
  const HeadingComponent = ({ children }: { children?: React.ReactNode }) => {
    const text =
      typeof children === 'string'
        ? children
        : extractTextFromChildren(children);
    const id = slugify(text);
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;
    return <Tag id={id}>{children}</Tag>;
  };
  HeadingComponent.displayName = `Heading${level}`;
  return HeadingComponent;
}

const markdownComponents = {
  h1: createHeadingRenderer(1),
  h2: createHeadingRenderer(2),
  h3: createHeadingRenderer(3),
  h4: createHeadingRenderer(4),
  h5: createHeadingRenderer(5),
  h6: createHeadingRenderer(6),
};

export default function ArticlePage() {
  const router = useRouter();
  const { slug } = router.query;
  const [article, setArticle] = useState<DevtoArticleFull | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`/api/articles/${slug}`)
      .then((res) => (res.ok ? res.json() : null))
      .then(setArticle)
      .catch(() => setArticle(null))
      .finally(() => setLoading(false));
  }, [slug]);

  const sections = useMemo(
    () =>
      article?.body_markdown ? extractHeadings(article.body_markdown) : [],
    [article?.body_markdown]
  );

  if (loading) {
    return (
      <Main
        title="Loading..."
        meta={<Meta title="Loading..." description="" locale="en" />}
        showLanguageSelector={false}
      >
        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="text-xl text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </Main>
    );
  }

  if (!article) {
    return (
      <Main
        title="Article Not Found"
        meta={<Meta title="Article Not Found" description="" locale="en" />}
        showLanguageSelector={false}
      >
        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Article not found.
          </p>
        </div>
      </Main>
    );
  }

  const tags = normalizeTags(article);
  const ogImage = article.social_image || article.cover_image;

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

  return (
    <Main
      title="LucasHeartcliff"
      showLanguageSelector={false}
      meta={
        <Meta
          title={article.title}
          description={article.description}
          locale="en"
          canonical={article.canonical_url}
          image={ogImage || undefined}
        />
      }
    >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <AsideNav sections={sections} translate={false} widthRem={18} />
      <article className="mx-auto max-w-4xl overflow-x-hidden px-4 py-8">
        {article.cover_image && (
          <img
            src={article.cover_image}
            alt={article.title}
            className="mb-6 h-64 w-full rounded-lg object-cover md:h-96"
          />
        )}
        <h1 className="text-3xl font-bold text-black dark:text-white md:text-5xl">
          {article.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
          {article.published_at && (
            <span>
              {new Date(article.published_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          )}
          <span>{article.reading_time_minutes} min read</span>
        </div>
        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-primary/10 rounded px-2 py-0.5 text-xs font-medium text-primary"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        <hr className="my-6 border-gray-200 dark:border-gray-700" />
        <div className="prose prose-lg dark:prose-invert max-w-none [&_pre]:overflow-x-auto">
          <ReactMarkdown components={markdownComponents}>
            {article.body_markdown}
          </ReactMarkdown>
        </div>
      </article>
    </Main>
  );
}
