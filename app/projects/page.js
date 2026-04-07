import FeaturedProject from '../../components/FeaturedProject';
import { FeaturedProjects } from '../../components/FeaturedProjects';
import items from '../../data/projects';
import Base from '../../layouts/Base';
import { SITE_NAME, SITE_URL } from '../../lib/site';

export const metadata = {
  title: 'Projects',
  description:
    'Selected AI, security, and MLOps work — agent discovery on GCP, privacy-first digital twins, and threat-detection pipelines.',
  openGraph: {
    title: `Projects // ${SITE_NAME}`,
    url: `${SITE_URL}/projects`,
    images: ['/static/images/projects-bw.jpg']
  }
};

export default function Projects() {
  const renderFeatured = () => {
    const featured = ['Captrace', 'Shadow AgentMap', 'Sentinel Twin', 'Threat-Watch'];

    return items
      .map((item) => {
        return item.projects.filter((project) =>
          featured.includes(project.title)
        );
      })
      .filter((item) => {
        return item.length > 0;
      })
      .flat()
      .map((item, index) => {
        return (
          <FeaturedProject key={item.title} index={index} project={item} />
        );
      });
  };

  const renderAll = () => {
    return items.map((item) => {
      return (
        <div key={item.year}>
          <h3>{item.year}</h3>
          <ul>
            {item.projects.map((project, index) => {
              return (
                <ProjectItem
                  key={`${item.year}-${project.title}-${index}`}
                  project={project}
                />
              );
            })}
          </ul>
        </div>
      );
    });
  };

  const getTotalProjects = () => {
    let total = 0;

    for (let i = 0; i < items.length; i++) {
      total = total + items[i].projects.length;
    }

    return total;
  };

  const description = `A snapshot of <strong>${getTotalProjects()} highlighted builds</strong> across AI agents, security, and MLOps. Links point to my GitHub profile until per-repo pages are public.`;

  return (
    <Base
      title={`Projects // ${SITE_NAME}`}
      tagline="Agents. Security. MLOps."
      primaryColor="cyan"
      secondaryColor="green"
    >
      <p dangerouslySetInnerHTML={{ __html: description }} />

      <h2>Featured Projects</h2>
      <FeaturedProjects>{renderFeatured()}</FeaturedProjects>

      <h2>All Projects</h2>
      {renderAll()}
    </Base>
  );
}

function ProjectItem(props) {
  const { project } = props;
  const isExternal = project.url?.startsWith('http');

  return (
    <li>
      {isExternal ? (
        <a href={project.url} target="_blank" rel="noreferrer">
          {project.title}
        </a>
      ) : (
        <a href={project.url}>{project.title}</a>
      )}
      {project.sourceUrl ? (
        <>
          <span> · </span>
          <a href={project.sourceUrl} target="_blank" rel="noreferrer">
            Source
          </a>
        </>
      ) : null}
      {project.writeupUrl ? (
        <>
          <span> · </span>
          <a href={project.writeupUrl} target="_blank" rel="noreferrer">
            Write-up
          </a>
        </>
      ) : null}
    </li>
  );
}
