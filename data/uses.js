const categories = [
  {
    name: 'Cloud',
    items: [
      {
        title: 'Google Cloud Platform',
        description:
          'Vertex AI, GKE, BigQuery — primary surface for agentic backends and data workloads.',
        url: 'https://cloud.google.com/'
      },
      {
        title: 'Amazon Web Services',
        description: 'EC2, S3, RDS — legacy and hybrid workloads during large-scale migrations.',
        url: 'https://aws.amazon.com/'
      }
    ]
  },
  {
    name: 'AI / ML',
    items: [
      {
        title: 'Google ADK & AgentSpace',
        description:
          'Building and deploying production agentic flows; cut GenAI deployment time materially on recent engagements.',
        url: 'https://cloud.google.com/vertex-ai'
      },
      {
        title: 'LangChain',
        description: 'Orchestration and tooling for LLM-powered applications.',
        url: 'https://www.langchain.com/'
      },
      {
        title: 'TensorFlow',
        description: 'Training and serving models in Python-centric pipelines.',
        url: 'https://www.tensorflow.org/'
      },
      {
        title: 'Python',
        description: 'Default language for ML, automation, and cloud glue code.',
        url: 'https://www.python.org/'
      }
    ]
  },
  {
    name: 'Infrastructure',
    items: [
      {
        title: 'Terraform',
        description: 'IaC for GCP/AWS resources and repeatable environments.',
        url: 'https://www.terraform.io/'
      },
      {
        title: 'Kubernetes (GKE)',
        description: 'Running containerized services and agent backends at scale.',
        url: 'https://kubernetes.io/'
      },
      {
        title: 'Docker',
        description: 'Local and CI images for services and batch jobs.',
        url: 'https://www.docker.com/'
      },
      {
        title: 'GitHub Actions',
        description: 'CI/CD, checks, and deployment automation.',
        url: 'https://github.com/features/actions'
      }
    ]
  }
];

export default categories;
