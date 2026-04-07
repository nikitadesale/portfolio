import Base from '../../layouts/Base';
import WorkGridClient from '../../components/work/WorkGridClient';
import { SITE_NAME, SITE_URL } from '../../lib/site';
import workItems from '../../data/work';

const TOOLBOX = [
  'Google ADK',
  'AgentSpace',
  'Vertex AI',
  'GCP',
  'AWS',
  'Terraform',
  'Kubernetes',
  'Python',
  'FastAPI',
  'n8n'
];

export const metadata = {
  title: 'Work',
  description:
    'Experience across AI engineering and cloud infrastructure, focused on production outcomes.',
  openGraph: {
    title: `Work // ${SITE_NAME}`,
    url: `${SITE_URL}/work`,
    images: ['/static/images/projects-bw.jpg']
  }
};

export default function Work() {
  const description =
    "My journey with cloud and data systems grew into building production-grade AI workflows. I focus on measurable outcomes, platform reliability, and shipping systems teams can trust.";

  return (
    <Base
      title={`Work // ${SITE_NAME}`}
      tagline="Architect. Scale. Transform."
      primaryColor="cyan"
      secondaryColor="green"
    >
      <p className="max-w-170">{description}</p>

      <h2 className="mt-8">Work Experience</h2>
      <WorkGridClient items={workItems} />

      <h2 className="mt-8">My Toolbox</h2>
      <ul className="m-0 mb-2.5 flex list-none flex-wrap gap-2 p-0">
        {TOOLBOX.map((item) => (
          <li
            key={item}
            className="border-hover bg-command text-primary rounded-full border px-3 py-1 text-sm"
          >
            {item}
          </li>
        ))}
      </ul>
    </Base>
  );
}

