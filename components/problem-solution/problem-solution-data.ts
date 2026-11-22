export interface SectionHeaderData {
  eyebrow: string;
  headline: string;
  subheadline: string;
  frictionStat: {
    value: string;
    label: string;
  };
}

export interface RawSpreadsheetRow {
  id: string;
  date: string;
  item: string;
  revenue: string;
  notes: string;
  status: "error" | "duplicate" | "missing" | "valid";
  statusLabel?: string;
}

export interface KpiMetric {
  id: string;
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down" | "neutral";
  contextNote?: string;
}

export interface AiBotExchange {
  question: string;
  answer: string;
  actionTag: string;
}

export interface BeforeAfterComparisonData {
  before: {
    badge: string;
    title: string;
    rawSpreadsheetRows: RawSpreadsheetRow[];
    manualPainNotes: string[];
  };
  after: {
    badge: string;
    title: string;
    kpis: KpiMetric[];
    aiBotExchange: AiBotExchange;
  };
}

export interface ProblemSolutionPair {
  id: string;
  index: string;
  problemTitle: string;
  problemDetail: string;
  solutionTitle: string;
  solutionDetail: string;
  impactMetric: string;
  manualTime: string;
  aiTime: string;
}

/* =========================================================================
   1. SECTION HEADER DATA
   ========================================================================= */
export const SECTION_HEADER: SectionHeaderData = {
  eyebrow: "PROBLEM & SOLUTION",
  headline: "Business data piles up, yet executive decisions are still based on guesswork.",
  subheadline:
    "Manual reconciliations consume countless hours while profit leakages slip through undetected. Transform fragmented raw records into instant dashboards and conversational answers.",
  frictionStat: {
    value: "5.2 hrs/week",
    label: "Average time wasted on manual spreadsheet audits & reconciliations",
  },
};

/* =========================================================================
   2. BEFORE / AFTER COMPARISON DATA (100% AUTHENTIC AI BUSINESS ANALYTICS)
   ========================================================================= */
export const BEFORE_AFTER_COMPARISON: BeforeAfterComparisonData = {
  before: {
    badge: "Manual Method (4 Hours 15 Mins)",
    title: "Fragmented Spreadsheets & Manual Multi-Channel Audits",
    rawSpreadsheetRows: [
      {
        id: "row-1",
        date: "Nov 04",
        item: "Enterprise SaaS License (Tier 2)",
        revenue: "$4,820",
        notes: "#REF! Unmatched RevRec Schedule",
        status: "error",
        statusLabel: "#REF!",
      },
      {
        id: "row-2",
        date: "Nov 05",
        item: "Omnichannel Merchant Payout (Stripe)",
        revenue: "$12,450",
        notes: "Duplicate Transaction Ledger ID",
        status: "duplicate",
        statusLabel: "Duplicate",
      },
      {
        id: "row-3",
        date: "Nov 06",
        item: "Q4 Promotional Discount Voucher",
        revenue: "-$1,920",
        notes: "Uncalculated Discount Variance",
        status: "error",
        statusLabel: "Margin Drift",
      },
      {
        id: "row-4",
        date: "Nov 07",
        item: "Cloud Hosting Infrastructure (AWS)",
        revenue: "-$3,100",
        notes: "Missing Cost Center Attribution",
        status: "missing",
        statusLabel: "Missing SKU",
      },
      {
        id: "row-5",
        date: "Nov 08",
        item: "3PL Logistics Freight Surcharge",
        revenue: "-$1,315",
        notes: "Unreconciled Carrier Invoice",
        status: "error",
        statusLabel: "Overcharge",
      },
    ],
    manualPainNotes: [
      "Margin formulas break whenever new rows, billing tiers, or merchant payout schemas are added.",
      "Impossible to identify which specific revenue streams, ad campaigns, or vendors are actively leaking net profit.",
      "Founders and operators spend 20+ hours a month manually debugging spreadsheet formula errors instead of executing growth.",
    ],
  },
  after: {
    badge: "With Jovix AI (Under 1.8 Seconds)",
    title: "Autonomous Analytics Dashboard & AI Decision Copilot",
    kpis: [
      {
        id: "kpi-revenue",
        label: "Net Revenue",
        value: "$148,400",
        delta: "+18.4%",
        trend: "up",
        contextNote: "Month-to-date run-rate",
      },
      {
        id: "kpi-margin",
        label: "Gross Profit Margin",
        value: "64.2%",
        delta: "-4.2% requires audit",
        trend: "down",
        contextNote: "Variance flagged by AI",
      },
      {
        id: "kpi-product",
        label: "Top Contributing Channel",
        value: "Enterprise Direct",
        delta: "38% net margin yield",
        trend: "up",
        contextNote: "Optimal contribution",
      },
    ],
    aiBotExchange: {
      question: "Why did net profit margin dip 4.2% this week despite record transaction volume?",
      answer:
        "Top-line sales surged +18%, but unmonitored promotional discount codes compounded with duplicate cloud infrastructure charges (AWS invoice #88192), eroding $6,200 in net profit.",
      actionTag: "AI Action: Deprecate expired promotional code 'OCT-SCALE' & dispute duplicate cloud invoice #88192",
    },
  },
};

/* =========================================================================
   3. PROBLEM / SOLUTION PAIRS (EXACTLY 4 CORE VECTORS)
   ========================================================================= */
export const PROBLEM_SOLUTION_PAIRS: ProblemSolutionPair[] = [
  {
    id: "spreadsheet-hell",
    index: "01",
    problemTitle: "Trapped in Spreadsheet Hell",
    problemDetail:
      "Data scattered across raw CSVs and ledgers. Manual reconciliations are slow and formulas break easily.",
    solutionTitle: "Auto-Generated AI Dashboard",
    solutionDetail:
      "Jovix ingests multi-source data instantly and auto-generates visual KPI dashboards with zero formulas.",
    impactMetric: "From 4+ hrs/week -> < 1.8 seconds",
    manualTime: "4+ hrs/week",
    aiTime: "< 1.8s",
  },
  {
    id: "profit-leakage",
    index: "02",
    problemTitle: "High Sales Volume with Hidden Margin Leakage",
    problemDetail:
      "Top-line revenue looks healthy, but net profits quietly erode under unmonitored promo codes and fee creep.",
    solutionTitle: "Automated Margin & Anomaly Auditing",
    solutionDetail:
      "Continuous anomaly audits surface margin decay, fee creep, and vendor overcharges before month-end.",
    impactMetric: "Leakages detected proactively before month-end",
    manualTime: "Discovered at month-end",
    aiTime: "Real-time alerts",
  },
  {
    id: "static-charts",
    index: "03",
    problemTitle: "Passive Dashboards That Cannot Answer 'Why?'",
    problemDetail:
      "Static BI charts show margin dips, but finding root causes takes hours of manual transaction digging.",
    solutionTitle: "Conversational AI Business Assistant",
    solutionDetail:
      "Ask questions in plain language to get instant, verified data root causes and actionable next steps.",
    impactMetric: "Data-backed clarity instead of guesswork",
    manualTime: "Hours of manual digging",
    aiTime: "Instant conversational root cause",
  },
  {
    id: "complex-bi",
    index: "04",
    problemTitle: "Enterprise BI Tools Require Dedicated Data Teams",
    problemDetail:
      "Legacy BI suites demand dedicated data engineering teams and fragile ETL pipelines to maintain.",
    solutionTitle: "Zero Learning Curve Architecture",
    solutionDetail:
      "Engineered for founders and operators to understand true margin health within 60 seconds of logging in.",
    impactMetric: "Ready on day one without a data team",
    manualTime: "Months of BI onboarding",
    aiTime: "Instant activation on login",
  },
];
