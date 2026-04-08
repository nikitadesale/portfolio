---
title: Notes on production AI agents
description:
  'What I focus on when shipping agentic backends: ADK-style patterns, guardrails, and cloud-native
  runtimes that survive real traffic.'
image: /static/images/articles-bw.jpg
skip: true
date: '2026-04-01'
---

I spend most of my time at the intersection of **cloud platforms** and **agentic systems** — wiring LLMs and tools into backends that are observable, cost-aware, and safe to run in production.

## Why production agents are different

Toy demos hide failure modes. In production you care about latency budgets, cost per request, evals, and rollback — not just a clever prompt.

## Principles

A few principles I keep coming back to:

- **Treat the agent as a service** — same expectations as any other API: timeouts, retries, structured logs, and clear failure modes.
- **Ground everything you can** — RAG, policy checks, and human-in-the-loop flows beat “prompt harder” when stakes are high.
- **Infrastructure is part of the product** — Terraform, GKE, and CI aren’t overhead; they’re how you ship the same agent reliably across environments.

### When to add human review

If a wrong action has financial, safety, or compliance impact, design an explicit human checkpoint instead of hoping the model self-corrects.

## What’s next here

I’ll use this space for longer write-ups on migrations, MLOps, and lessons from the field. For code and experiments, find me on [GitHub](https://github.com/nikitadesale).
