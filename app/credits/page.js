import { Box } from '../../components/Box';
import Base from '../../layouts/Base';
import { SITE_NAME, SITE_URL } from '../../lib/site';

export const metadata = {
  title: 'Credits',
  description:
    'This site is based on an open-source template by Zeno Rocha, used under the MIT License.',
  openGraph: {
    title: `Credits // ${SITE_NAME}`,
    url: `${SITE_URL}/credits`,
    images: ['/static/images/reminder-bw.jpg']
  }
};

export default function Credits() {
  return (
    <Base
      title={`Credits // ${SITE_NAME}`}
      tagline="Thanks. Open source."
      primaryColor="cyan"
      secondaryColor="green"
    >
      <Box className="text-justify">
        <h2 className="text-primary mt-0">Zeno Rocha</h2>
        <p>
          This website is a fork of the repository{' '}
          <a
            href="https://github.com/zenorocha/zenorocha.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            zenorocha.com
          </a>
          , which was used as the technological base for layout and structure.
          Zeno made his site available on GitHub under the{' '}
          <a
            href="https://github.com/zenorocha/zenorocha.com/blob/main/readme.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            MIT License
          </a>
          . Special thanks to Zeno for sharing that work.
        </p>
        <p>
          Content, copy, and projects described on {SITE_URL.replace('https://', '')}{' '}
          are my own unless otherwise noted.
        </p>
      </Box>
    </Base>
  );
}
