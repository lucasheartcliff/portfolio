import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import ReactMarkdown from 'react-markdown';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

/**
 * Serializable article props.
 * `tags` is always normalized to string[] here in getStaticProps,
 * since the /articles/{username}/{slug} endpoint returns:
 * - `tag_list` as a comma-separated string (e.g. "discuss")
 * - `tags` as string[] (e.g. ["discuss"])
 */
interface Article {
  title: string;
  description: string;
  body_markdown: string;
  body_html: string;
  cover_image: string | null;
  social_image: string | null;
  published_at: string;
  reading_time_minutes: number;
  tags: string[];
  url: string;
  canonical_url: string;
}

interface Props {
  article: Article | null;
}

const DEVTO_API = 'https://dev.to/api';
const USERNAME = process.env.NEXT_PUBLIC_DEVTO_USERNAME || 'lucasheartcliff';

export default function ArticlePage({ article }: Props) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Main
        title="Loading..."
        meta={<Meta title="Loading..." description="" locale="en" />}
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
      >
        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Article not found.
          </p>
        </div>
      </Main>
    );
  }

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
      <article className="mx-auto max-w-4xl px-4 py-8">
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
          <span>
            {new Date(article.published_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          <span>{article.reading_time_minutes} min read</span>
        </div>
        {article.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        <hr className="my-6 border-gray-200 dark:border-gray-700" />
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <ReactMarkdown>{article.body_markdown}</ReactMarkdown>
        </div>
      </article>
    </Main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const res = await fetch(
      `${DEVTO_API}/articles?username=${USERNAME}&per_page=30`
    );
    if (!res.ok) return { paths: [], fallback: true };
    const articles = await res.json();

    const locales = ['en', 'pt'];
    const paths = articles.flatMap((a: any) =>
      locales.map((locale: string) => ({
        params: { locale, slug: a.slug },
      }))
    );

    return { paths, fallback: true };
  } catch {
    return { paths: [], fallback: true };
  }
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;

  try {
    const res = await fetch(`${DEVTO_API}/articles/${USERNAME}/${slug}`);
    if (!res.ok) {
      return { props: { article: null }, revalidate: 3600 };
    }
    const data = await res.json();

    // Normalize tags: the single-article endpoint returns `tags` as string[]
    // and `tag_list` as a comma-separated string. We normalize to string[].
    let tags: string[] = [];
    if (Array.isArray(data.tags)) {
      tags = data.tags;
    } else if (typeof data.tag_list === 'string' && data.tag_list) {
      tags = data.tag_list.split(',').map((t: string) => t.trim()).filter(Boolean);
    } else if (Array.isArray(data.tag_list)) {
      tags = data.tag_list;
    }

    return {
      props: {
        article: {
          title: data.title,
          description: data.description,
          body_markdown: data.body_markdown || '',
          body_html: data.body_html || '',
          cover_image: data.cover_image || null,
          social_image: data.social_image || null,
          published_at: data.published_at,
          reading_time_minutes: data.reading_time_minutes,
          tags,
          url: data.url,
          canonical_url: data.canonical_url || data.url,
        },
      },
      revalidate: 3600,
    };
  } catch {
    return { props: { article: null }, revalidate: 3600 };
  }
};
