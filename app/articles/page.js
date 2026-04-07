import FeaturedArticle from '../../components/FeaturedArticle';
import { ListGroup } from '../../components/ListGroup';
import ListItem from '../../components/ListItem';
import Base from '../../layouts/Base';
import { getAllPosts, getPostBySlug } from '../../lib/blog';
import { SITE_NAME, SITE_URL } from '../../lib/site';

export const metadata = {
  title: 'Articles',
  description:
    'Writing on AI agents, cloud engineering, and MLOps — short notes and longer posts.',
  openGraph: {
    title: `Articles // ${SITE_NAME}`,
    url: `${SITE_URL}/articles`,
    images: ['/static/images/articles-bw.jpg']
  }
};

export default async function Articles() {
  const allPosts = getAllPosts(['date', 'skip', 'slug', 'title']);

  const featuredParams = [
    'date',
    'slug',
    'title',
    'image',
    'content',
    'description'
  ];

  const featuredPosts = [
    getPostBySlug('building-a-real-time-analytics-platform', featuredParams),
    getPostBySlug(
      'googles-agent-developer-kit-multi-agent-orchestration',
      featuredParams
    ),
    getPostBySlug('notes-on-production-ai-agents', featuredParams)
  ].filter(Boolean);

  const description = `Ideas and notes on <strong>AI agents, cloud, and MLOps</strong> — <strong>${allPosts.length} article${allPosts.length === 1 ? '' : 's'}</strong> so far.`;

  const renderFeatured = () => {
    return featuredPosts.map((post, index) => {
      return (
        <FeaturedArticle
          key={post.slug}
          index={index}
          href={`/${post.slug}/`}
          title={post.title}
          description={post.description}
          image={post.image}
          stats={post.stats}
          content={post.content}
        />
      );
    });
  };

  const renderAll = () => {
    return allPosts
      .filter((post) => !post.skip)
      .map((post, index) => {
        return (
          <ListItem
            key={post.slug}
            index={index}
            href={`/${post.slug}/`}
            title={post.title}
            date={post.date}
          />
        );
      });
  };

  return (
    <Base
      title={`Articles // ${SITE_NAME}`}
      tagline="Notes from the field."
      primaryColor="yellow"
      secondaryColor="pink"
    >
      <p dangerouslySetInnerHTML={{ __html: description }} />
      {featuredPosts.length > 0 ? (
        <>
          <h2>Featured</h2>
          <div className="my-2.5 mt-2.5 -ml-5 md:flex md:w-[calc(100%+3.375rem)] md:justify-between">
            {renderFeatured()}
          </div>
        </>
      ) : null}
      <h2>All Articles</h2>
      <ListGroup>{renderAll()}</ListGroup>
    </Base>
  );
}
