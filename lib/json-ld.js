import { SITE_NAME, SITE_URL } from './site';

export const getPersonJsonLd = () => {
  return {
    '@context': 'https://schema.org/',
    '@type': 'Person',
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/static/images/avatar.png`,
    description:
      'AI & Cloud Engineer focused on production-grade AI agents, GCP and AWS platforms, and scalable cloud infrastructure.',
    name: SITE_NAME,
    givenName: 'Nikita',
    familyName: 'Desale',
    jobTitle: 'AI & Cloud Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Searce',
      url: 'https://www.searce.com/'
    },
    sameAs: [
      'https://github.com/nikitadesale',
      'https://www.linkedin.com/in/nikitadesale',
      'https://medium.com/@njdesale'
    ],
    knowsAbout: [
      { '@type': 'Thing', name: 'Google Cloud Platform' },
      { '@type': 'Thing', name: 'Amazon Web Services' },
      { '@type': 'Thing', name: 'Machine Learning Operations' },
      { '@type': 'Thing', name: 'Large Language Models' }
    ],
    email: 'njdesale@gmail.com'
  };
};
