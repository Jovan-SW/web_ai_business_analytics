export interface FaqItem {
  id: string;
  index: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-data-retention",
    index: "01",
    question: "Does Jovix store our financial data or train AI on it?",
    answer:
      "No. Jovix never stores your financial data or trains AI models on it. All calculations run in temporary memory and are deleted as soon as your session ends. Your data stays private and secure.",
  },
  {
    id: "faq-read-only-access",
    index: "02",
    question: "Can Jovix change or damage records in our existing systems?",
    answer:
      "No. Jovix uses 100% read-only access. It can only view your data to generate insights. It cannot edit, delete, or overwrite any records in your QuickBooks, NetSuite, or database.",
  },
  {
    id: "faq-connectors-supported",
    index: "03",
    question: "Which tools and software can I connect to Jovix?",
    answer:
      "You can connect over 50 popular tools, including NetSuite, QuickBooks, Xero, Stripe, and major databases like PostgreSQL, Snowflake, and BigQuery. You can also upload simple Excel and CSV files.",
  },
  {
    id: "faq-setup-time",
    index: "04",
    question: "How long does setup take, and do I need a programmer?",
    answer:
      "Setup takes less than 2 minutes and requires zero coding. Simply sign in, connect your accounts, and Jovix automatically organizes your numbers into a clean dashboard.",
  },
  {
    id: "faq-accuracy",
    index: "05",
    question: "How does Jovix ensure calculations are 100% accurate?",
    answer:
      "Jovix uses a verified math engine for all numbers, totals, and percentages—not generative AI. AI is only used to explain the results in plain words, so your financial metrics are always exact and reliable.",
  },
];
