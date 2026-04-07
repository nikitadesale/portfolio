import { notFound } from 'next/navigation';
import { ArticleJsonLd } from 'next-seo';

import { CustomMDX } from '../../components/shared/mdx';
import Blogpost from '../../layouts/Blogpost';
import { getPostBySlug, getPostSlugs } from '../../lib/blog';
import { SITE_NAME, SITE_URL } from '../../lib/site';
import { extractToc } from '../../lib/toc';

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const post = getPostBySlug(slug, [
      'title',
      'description',
      'image',
      'date',
      'canonical_url',
      'lang'
    ]);

    if (!post) {
      notFound();
    }

    const title = `${post.title} // ${SITE_NAME}`;
    const description = post.description || '';
    const url = `${SITE_URL}/${slug}`;
    const image = post.image
      ? `${SITE_URL}${post.image}`
      : `${SITE_URL}/static/images/home-opt.jpg`;

    return {
      title: post.title,
      description,
      openGraph: {
        title,
        description,
        url,
        images: [image],
        type: 'article',
        publishedTime: new Date(post.date).toISOString(),
        modifiedTime: new Date(post.date).toISOString(),
        authors: [SITE_NAME]
      },
      alternates: post.canonical_url
        ? {
            canonical: post.canonical_url
          }
        : undefined
    };
  } catch (error) {
    console.warn(`Failed to generate metadata for "${slug}": ${error.message}`);
    return {
      title: 'Not Found'
    };
  }
}

export default async function Post({ params }) {
  const { slug } = await params;

  let post;

  try {
    post = getPostBySlug(slug, [
      'canonical_url',
      'content',
      'date',
      'description',
      'image',
      'lang',
      'slug',
      'title'
    ]);
  } catch (error) {
    console.warn(`Failed to load post "${slug}": ${error.message}`);
    notFound();
  }

  if (!post) {
    notFound();
  }

  const title = `${post.title} // ${SITE_NAME}`;
  const url = `${SITE_URL}/${post.slug}`;
  const date = new Date(post.date).toISOString();
  const image = post.image
    ? `${SITE_URL}${post.image}`
    : `${SITE_URL}/static/images/home-opt.jpg`;

  const toc = extractToc(post.content || '');

  return (
    <>
      <ArticleJsonLd
        authorName={SITE_NAME}
        type="Blog"
        url={url}
        title={title}
        images={[image]}
        datePublished={date}
        dateModified={date}
        description={post.description}
      />
      <Blogpost toc={toc} title={post.title} image={post.image} date={post.date}>
        <CustomMDX source={post.content || ''} format="md" />
      </Blogpost>
    </>
  );
}

export const revalidate = 60;
