export interface HowItWorksStep {
  id: string;
  stepNumber: string;
  tag: string;
  title: string;
  description: string;
  actionText: string;
}

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    id: "step-login",
    stepNumber: "01",
    tag: "AUTHENTICATION",
    title: "Sign In & Secure Workspace",
    description:
      "Log in seamlessly via Google, email, or enterprise SSO. Your financial ledgers are protected by zero-retention bank-grade encryption from day one.",
    actionText: "Instant SSO Activation",
  },
  {
    id: "step-workspace",
    stepNumber: "02",
    tag: "INGESTION",
    title: "Create Workspace & Connect Data",
    description:
      "Name your business workspace and upload raw CSV files or link live connectors (Stripe, QuickBooks, NetSuite, Google Sheets) with zero ETL pipelines.",
    actionText: "Auto-Schema Parsing",
  },
  {
    id: "step-dashboard",
    stepNumber: "03",
    tag: "SYNTHESIS",
    title: "Auto-Generate AI Dashboard",
    description:
      "Jovix instantly normalizes schemas and reconciles transaction rows into interactive visual KPI cards, margin curves, and automated anomaly alerts.",
    actionText: "Sub-Second Synthesis",
  },
  {
    id: "step-copilot",
    stepNumber: "04",
    tag: "INTERROGATION",
    title: "Ask & Interrogate with AI Copilot",
    description:
      "Ask complex business questions in plain English. Get immediate root-cause answers, margin forecast curves, and boardroom-ready action steps.",
    actionText: "Conversational Intelligence",
  },
];

