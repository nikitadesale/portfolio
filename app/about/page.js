import Base from '../../layouts/Base';
import AboutClient from './AboutClient';
import { SITE_NAME, SITE_URL } from '../../lib/site';

const BIO =
  'Nikita Desale is an AI & Cloud Engineer focused on production-grade agents, multi-cloud platforms, and MLOps. He has shipped agentic backends on Google Cloud (ADK, AgentSpace), led large VM migrations from AWS to GCP, and is completing an MS in Business Analytics at CSU East Bay.';

export const metadata = {
  title: 'About',
  description: BIO,
  openGraph: {
    title: `About // ${SITE_NAME}`,
    description: BIO,
    url: `${SITE_URL}/about`,
    images: ['/static/images/about-bw.jpg']
  }
};

export default function About() {
  return (
    <Base
      title={`About // ${SITE_NAME}`}
      tagline="Build. Ship. Measure."
      primaryColor="pink"
      secondaryColor="purple"
    >
      <AboutClient description={BIO} />
    </Base>
  );
}
