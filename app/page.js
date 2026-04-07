import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { PostContent, PostMain } from '../components/Post';
import ShortcutHome from '../components/ShortcutHome';
import { Wrapper } from '../components/Wrapper';
import { getPersonJsonLd } from '../lib/json-ld';
import { SITE_NAME, SITE_URL } from '../lib/site';

const TAGLINE =
  'Obsessed with building production-grade AI agents and scalable cloud infrastructure.';

export const metadata = {
  title: SITE_NAME,
  description: TAGLINE,
  openGraph: {
    title: SITE_NAME,
    description: TAGLINE,
    url: SITE_URL,
    images: ['/static/images/home-bw.jpg']
  }
};

export default function Index() {
  const title = SITE_NAME;
  const description = TAGLINE;

  return (
    <Wrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPersonJsonLd())
        }}
        key="person-jsonld"
      />
      <Navbar />
      <PostMain className="mx-auto flex items-start md:w-200">
        <PostContent className="mb-5 p-0!">
          <div className="mx-5 mt-64 flex w-full max-w-190 flex-col items-start">
            <h1>{title}</h1>
            <p className="mt-0">
              <strong>
                AI & Cloud Engineer at{' '}
                <a href="https://www.searce.com/" target="_blank" rel="noreferrer">
                  Searce
                </a>
              </strong>
              <br />
              {description}
            </p>
            <ShortcutHome />
          </div>
        </PostContent>
      </PostMain>
      <Footer />
    </Wrapper>
  );
}
