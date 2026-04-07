import Base from '../../../layouts/Base';
import projects from '../../../data/projects';
import { SITE_NAME, SITE_URL } from '../../../lib/site';

const captrace = projects
  .flatMap((group) => group.projects)
  .find((p) => p.title === 'Captrace');

export const metadata = {
  title: 'Captrace',
  description:
    captrace?.description ??
    'Captrace is a governed diligence pipeline for decks and spreadsheets.',
  openGraph: {
    title: `Captrace // ${SITE_NAME}`,
    url: `${SITE_URL}/projects/captrace`,
    images: ['/static/images/projects-bw.jpg']
  }
};

export default function CaptraceProject() {
  const demoUrl =
    captrace?.demoUrl ??
    'https://drive.google.com/file/d/1L0YjZhPMJitQVJkWV6aF3psZ6OC9_Qp-/preview';
  const sourceUrl = captrace?.sourceUrl;
  const fallbackUrl = captrace?.demoFallbackUrl;

  return (
    <Base
      title={`Captrace // ${SITE_NAME}`}
      tagline="Decks. Sheets. Governance."
      primaryColor="cyan"
      secondaryColor="green"
    >
      <p className="mb-5">
        Captrace turns messy pitch materials into a <strong>governed</strong>{' '}
        first pass: extract claims, stress-test narrative against numbers, and
        draft a structured memo with optional human approval and traceability
        via <strong>n8n</strong>.
      </p>

      <div className="border-hover bg-command aspect-video overflow-hidden rounded-lg border">
        <iframe
          title="Captrace demo video"
          src={demoUrl}
          className="h-full w-full"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {sourceUrl ? (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="border-hover hover:border-primary text-primary inline-flex items-center rounded-lg border px-3 py-2 no-underline transition-colors"
          >
            View source on GitHub →
          </a>
        ) : null}
        {fallbackUrl ? (
          <a
            href={fallbackUrl}
            target="_blank"
            rel="noreferrer"
            className="border-hover hover:border-primary text-secondary inline-flex items-center rounded-lg border px-3 py-2 no-underline transition-colors"
          >
            Backup demo link →
          </a>
        ) : null}
      </div>
    </Base>
  );
}

