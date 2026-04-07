import categories from '../../data/uses';
import Base from '../../layouts/Base';
import { SITE_NAME, SITE_URL } from '../../lib/site';

export const metadata = {
  title: 'Uses',
  description:
    'Cloud platforms, AI/ML stacks, and infrastructure tools I rely on for production work.',
  openGraph: {
    title: `Uses // ${SITE_NAME}`,
    url: `${SITE_URL}/uses`,
    images: ['/static/images/uses-bw.jpg']
  }
};

export default function Uses() {
  const renderAll = () => {
    return categories.map((category) => {
      return (
        <div key={category.name}>
          <h2>{category.name}</h2>
          <ul>
            {category.items.map((item, index) => {
              return (
                <li key={`${category.name}-${item.title}-${index}`}>
                  <a href={item.url} target="_blank">
                    {item.title}
                  </a>
                  <span> - </span>
                  <span
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      );
    });
  };

  return (
    <Base
      title={`Uses // ${SITE_NAME}`}
      tagline="Cloud. AI. Infra."
      primaryColor="yellow"
      secondaryColor="pink"
    >
      <p
        dangerouslySetInnerHTML={{
          __html:
            'The <strong>tooling I reach for most</strong> when shipping agents, data pipelines, and multi-cloud infrastructure. Updated as the stack evolves.'
        }}
      />

      {renderAll()}
    </Base>
  );
}
