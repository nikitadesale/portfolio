const items = [
  {
    year: 'Projects',
    projects: [
      {
        title: 'Captrace',
        description:
          'Governed diligence pipeline that turns decks + spreadsheets into structured claims, stress-tests narrative vs numbers, and drafts a memo with traceability (n8n).',
        url: '/projects/captrace',
        active: true,
        icon: 'paper',
        stats: '#6 AI Valley Hackathon • n8n • MiniMax',
        sourceUrl: 'https://github.com/nikitadesale/captrace-deal-diligence-ai',
        demoUrl:
          'https://drive.google.com/file/d/1L0YjZhPMJitQVJkWV6aF3psZ6OC9_Qp-/preview',
        demoFallbackUrl:
          'https://drive.google.com/file/d/1L0YjZhPMJitQVJkWV6aF3psZ6OC9_Qp-/view?usp=sharing'
      },
      {
        title: 'Shadow AgentMap',
        description:
          'GCP AI agent security scanner that auto-discovers and classifies AI services using Gemini 2.5 and Terraform.',
        url: 'https://github.com/nikitadesale/sf-hackathon-ShadowAgentMap',
        active: true,
        icon: 'mastra',
        stats: 'Google ADK • Gemini 2.5 • Terraform',
        sourceUrl: 'https://github.com/nikitadesale/sf-hackathon-ShadowAgentMap',
        writeupUrl:
          'https://medium.com/@njdesale/shadowagentmap-building-an-ai-agent-security-scanner-on-google-adk-abd4a3d6b139'
      },
      {
        title: 'Sentinel Twin',
        description:
          'Privacy-first AI digital twin using Kimi K2.5 and HydraDB to validate actions against health and budget constraints.',
        url: 'https://github.com/nikitadesale/Total-Agent-Recall-Hackathon',
        active: true,
        icon: 'replicas',
        stats: 'Kimi K2.5 • HydraDB',
        sourceUrl: 'https://github.com/nikitadesale/Total-Agent-Recall-Hackathon',
        writeupUrl:
          'https://medium.com/@njdesale/sentinel-twin-the-missing-piece-in-ai-proactive-resistance-c6312551d3a3'
      },
      {
        title: 'Threat-Watch',
        description:
          'MLOps platform using LightGBM and Apache Airflow for faster threat detection workflows.',
        url: 'https://github.com/nikitadesale',
        active: true,
        icon: 'customer-io',
        stats: '~85% faster detection'
      }
    ]
  }
];

export default items;
