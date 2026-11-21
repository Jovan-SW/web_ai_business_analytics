export type IndustryKey = "saas" | "retail" | "logistics";

export interface RawRow {
  id: string;
  date: string;
  source: string;
  amount: string;
  status: string;
  flagType: "warning" | "error" | "neutral";
}

export interface KpiCardData {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  delta: string;
  isPositive: boolean;
  sublabel: string;
}

export interface ChartPoint {
  label: string;
  value: number;
  formatted: string;
}

export interface BentoBarItem {
  label: string;
  value: number; // percentage width 0-100
  percentage: string;
  amount: string;
  color: string;
}

export interface ChatScenarioChip {
  label: string;
  type: "warning" | "critical" | "neutral" | "success";
}

export interface ChatMessage {
  id: string;
  time: string;
  userRole?: string;
  userQuestion: string;
  aiSummary: string;
  aiChips: ChatScenarioChip[];
}

export interface ChatScenario {
  userQuestion: string;
  aiSummary: string;
  aiChips: ChatScenarioChip[];
  followUpHint: string;
  conversations: ChatMessage[];
}

export interface AnomalyItem {
  id: string;
  tag: string;
  dotColor: string;
  title: string;
  metric: string;
  time: string;
}

export interface IndustryData {
  key: IndustryKey;
  industryName: string;
  workspaceName: string;
  rawRows: RawRow[];
  kpis: KpiCardData[];
  chartPoints: ChartPoint[];
  peakIndex: number;
  peakLabel: string;
  resolvedInsight: string;
  bentoBars: BentoBarItem[];
  chatScenario: ChatScenario;
  anomalies: AnomalyItem[];
}

export const PRODUCT_INDUSTRIES: Record<IndustryKey, IndustryData> = {
  saas: {
    key: "saas",
    industryName: "SaaS & Subscriptions",
    workspaceName: "workspace / stripe-mrr / unified-ledger",
    rawRows: [
      {
        id: "INV-88192",
        date: "Nov 04",
        source: "Stripe Enterprise",
        amount: "$48,200",
        status: "Duplicate Surcharge",
        flagType: "error",
      },
      {
        id: "SUB-40291",
        date: "Nov 05",
        source: "Chargebee Core",
        amount: "$12,450",
        status: "Missing SKU Tier",
        flagType: "warning",
      },
      {
        id: "AWS-BILL",
        date: "Nov 06",
        source: "Cloud Infrastructure",
        amount: "$18,920",
        status: "+34% Unbudgeted Spurt",
        flagType: "error",
      },
      {
        id: "TX-90122",
        date: "Nov 07",
        source: "NetSuite Ledger",
        amount: "$64,100",
        status: "Ledger Divergence",
        flagType: "warning",
      },
      {
        id: "EXP-1092",
        date: "Nov 08",
        source: "Ramp Card Sync",
        amount: "$3,150",
        status: "Unmatched Tax Code",
        flagType: "neutral",
      },
    ],
    kpis: [
      {
        label: "Annual Recurring Revenue",
        value: 4820000,
        prefix: "$",
        delta: "+22.4%",
        isPositive: true,
        sublabel: "Audited run-rate",
      },
      {
        label: "Net Margin Health",
        value: 36.8,
        suffix: "%",
        delta: "+$14,280",
        isPositive: true,
        sublabel: "Recovered leakages",
      },
      {
        label: "Predictable Runway",
        value: 21.6,
        suffix: " Mo",
        delta: "Zero Drift",
        isPositive: true,
        sublabel: "Burn normalized",
      },
    ],
    chartPoints: [
      { label: "Jan", value: 310, formatted: "$310,000" },
      { label: "Feb", value: 345, formatted: "$345,000" },
      { label: "Mar", value: 330, formatted: "$330,000" },
      { label: "Apr", value: 395, formatted: "$395,000" },
      { label: "May", value: 430, formatted: "$430,000" },
      { label: "Jun", value: 490, formatted: "$490,000" },
      { label: "Jul", value: 520, formatted: "$520,000" },
    ],
    peakIndex: 6,
    peakLabel: "Peak ARR Surge: +$520K",
    resolvedInsight: "Duplicate AWS infrastructure charge of $4,280 isolated and reconciled back to NetSuite with audited cryptographic trail.",
    bentoBars: [
      {
        label: "Enterprise Annual Seats",
        value: 52,
        percentage: "52%",
        amount: "$2,506,400",
        color: "#134E4A",
      },
      {
        label: "Pro Monthly Subscriptions",
        value: 30,
        percentage: "30%",
        amount: "$1,446,000",
        color: "#D97706",
      },
      {
        label: "Usage Compute Overages",
        value: 12,
        percentage: "12%",
        amount: "$578,400",
        color: "#10B981",
      },
      {
        label: "Custom API & Add-ons",
        value: 6,
        percentage: "6%",
        amount: "$289,200",
        color: "#64748B",
      },
    ],
    chatScenario: {
      userQuestion: "Why did our net margin drop this month despite an increase in tier upgrades?",
      aiSummary:
        "Upgrade volume grew +22%, but net margin contracted due to unallocated cloud GPU compute spikes and early-quarter enterprise discount tiers.",
      aiChips: [
        { label: "AWS Compute +34%", type: "warning" },
        { label: "Enterprise Discount 20%", type: "critical" },
        { label: "Net Margin 36.8%", type: "neutral" },
      ],
      followUpHint: "Ask: 'Simulate capping enterprise discount tiers to 10%'...",
      conversations: [
        {
          id: "saas-c1",
          time: "10:14 AM",
          userRole: "Founder & CEO",
          userQuestion: "Why did our net margin drop this month despite an increase in tier upgrades?",
          aiSummary:
            "Upgrade volume grew +22%, but net margin contracted due to unallocated cloud GPU compute spikes and early-quarter enterprise discount tiers.",
          aiChips: [
            { label: "AWS Compute +34%", type: "warning" },
            { label: "Enterprise Discount 20%", type: "critical" },
            { label: "Net Margin 36.8%", type: "neutral" },
          ],
        },
        {
          id: "saas-c2",
          time: "10:17 AM",
          userRole: "VP Engineering",
          userQuestion: "Which infrastructure component triggered the $4,280 AWS cost spike?",
          aiSummary:
            "An unallocated GPU inference cluster in us-east-1 ran idle for 14 days without an active auto-scaling policy.",
          aiChips: [
            { label: "Idle GPU Cluster", type: "critical" },
            { label: "Leak: +$4,280", type: "warning" },
            { label: "Auto-shutdown Pending", type: "neutral" },
          ],
        },
        {
          id: "saas-c3",
          time: "10:22 AM",
          userRole: "CFO",
          userQuestion: "What is our projected ARR for next quarter if churn decreases by 0.5%?",
          aiSummary:
            "ARR is projected to reach $5.28M (+9.5% QoQ) with cash runway extending to 24.2 months without additional capital.",
          aiChips: [
            { label: "Projected ARR: $5.28M", type: "success" },
            { label: "Runway: 24.2 Months", type: "neutral" },
            { label: "Burn Normalized", type: "neutral" },
          ],
        },
      ],
    },
    anomalies: [
      {
        id: "s1",
        tag: "BILLING DRIFT",
        dotColor: "#F59E0B",
        title: "Unallocated AWS compute spike detected",
        metric: "+$4,280 leak",
        time: "12m ago",
      },
      {
        id: "s2",
        tag: "MARGIN LEAK",
        dotColor: "#EF4444",
        title: "Enterprise discounts diluting margins",
        metric: "-8.4% variance",
        time: "34m ago",
      },
      {
        id: "s3",
        tag: "RUNWAY HEALTH",
        dotColor: "#10B981",
        title: "Cash burn rate mitigated to target",
        metric: "21.6 Months",
        time: "1h ago",
      },
    ],
  },

  retail: {
    key: "retail",
    industryName: "E-Commerce & DTC Retail",
    workspaceName: "workspace / shopify-dtc / sku-margins",
    rawRows: [
      {
        id: "ORD-99201",
        date: "Nov 04",
        source: "Shopify Plus",
        amount: "$34,500",
        status: "Shipping Surcharge Spike",
        flagType: "error",
      },
      {
        id: "PAY-30129",
        date: "Nov 05",
        source: "Klarna Gateway",
        amount: "$19,800",
        status: "Fee Rate Variance",
        flagType: "warning",
      },
      {
        id: "PO-40912",
        date: "Nov 06",
        source: "Warehouse 3PL",
        amount: "$42,100",
        status: "Unscheduled Freight Fee",
        flagType: "error",
      },
      {
        id: "RET-10928",
        date: "Nov 07",
        source: "Loop Returns",
        amount: "$8,450",
        status: "Restock Ledger Lag",
        flagType: "neutral",
      },
      {
        id: "TX-77102",
        date: "Nov 08",
        source: "Amazon Seller API",
        amount: "$88,200",
        status: "Tax Jurisdiction Drift",
        flagType: "warning",
      },
    ],
    kpis: [
      {
        label: "Blended Gross Volume",
        value: 1240000,
        prefix: "$",
        delta: "+18.7%",
        isPositive: true,
        sublabel: "Multi-channel total",
      },
      {
        label: "Contribution Margin",
        value: 41.2,
        suffix: "%",
        delta: "+3.8% MoM",
        isPositive: true,
        sublabel: "After freight reconciliation",
      },
      {
        label: "Inventory Turn Cycle",
        value: 34.5,
        suffix: " Days",
        delta: "-4.2 Days",
        isPositive: true,
        sublabel: "Optimized capital hold",
      },
    ],
    chartPoints: [
      { label: "Jan", value: 140, formatted: "$140,000" },
      { label: "Feb", value: 165, formatted: "$165,000" },
      { label: "Mar", value: 190, formatted: "$190,000" },
      { label: "Apr", value: 240, formatted: "$240,000" },
      { label: "May", value: 310, formatted: "$310,000" },
      { label: "Jun", value: 285, formatted: "$285,000" },
      { label: "Jul", value: 365, formatted: "$365,000" },
    ],
    peakIndex: 6,
    peakLabel: "Peak Omnichannel: +$365K",
    resolvedInsight: "Unannounced 3PL freight rate increase detected across 42 orders. Auto-drafted supplier claim recovering $6,120.",
    bentoBars: [
      {
        label: "Direct-to-Consumer (Web)",
        value: 48,
        percentage: "48%",
        amount: "$595,200",
        color: "#134E4A",
      },
      {
        label: "Marketplace (Amazon & TikTok)",
        value: 32,
        percentage: "32%",
        amount: "$396,800",
        color: "#D97706",
      },
      {
        label: "Wholesale & B2B Retail",
        value: 14,
        percentage: "14%",
        amount: "$173,600",
        color: "#10B981",
      },
      {
        label: "Affiliate & Influencer",
        value: 6,
        percentage: "6%",
        amount: "$74,400",
        color: "#64748B",
      },
    ],
    chatScenario: {
      userQuestion: "Why did net profit drop this week even though transaction volume was up?",
      aiSummary:
        "Transaction volume rose +18%, but gross margin was squeezed by beverage promotional discounts and stockouts of high-margin items since Thursday.",
      aiChips: [
        { label: "Drink Discounts +24%", type: "warning" },
        { label: "High-Margin Stockout", type: "critical" },
        { label: "Order Volume +18%", type: "neutral" },
      ],
      followUpHint: "Ask: 'Calculate lost revenue from inventory stockouts'...",
      conversations: [
        {
          id: "ret-c1",
          time: "02:28 PM",
          userRole: "Founder & COO",
          userQuestion: "Why did net profit drop this week even though transaction volume was up?",
          aiSummary:
            "Transaction volume rose +18%, but gross margin was squeezed by beverage promotional discounts and stockouts of high-margin items since Thursday.",
          aiChips: [
            { label: "Drink Discounts +24%", type: "warning" },
            { label: "High-Margin Stockout", type: "critical" },
            { label: "Order Volume +18%", type: "neutral" },
          ],
        },
        {
          id: "ret-c2",
          time: "02:31 PM",
          userRole: "Store Manager",
          userQuestion: "What is the estimated lost revenue from Wagyu Bowl stockouts?",
          aiSummary:
            "Estimated lost revenue of $18,400 over the peak weekend (Friday–Sunday). Recommendation: increase safety stock by 35% ahead of Thursday.",
          aiChips: [
            { label: "Lost Revenue: -$18.4K", type: "critical" },
            { label: "Safety Stock +35%", type: "warning" },
            { label: "Peak: 7:00 PM", type: "neutral" },
          ],
        },
        {
          id: "ret-c3",
          time: "02:35 PM",
          userRole: "Finance Lead",
          userQuestion: "If drink discount vouchers are capped at 10%, what is the margin impact?",
          aiSummary:
            "Beverage category margin will rebound from 44% to 59%, restoring projected weekly net profit by +$8,120 without impacting order volume.",
          aiChips: [
            { label: "Recovered Margin: 59%", type: "success" },
            { label: "Profit: +$8.12K", type: "success" },
            { label: "Zero Traffic Drop", type: "neutral" },
          ],
        },
      ],
    },
    anomalies: [
      {
        id: "r1",
        tag: "TRAFFIC PATTERN",
        dotColor: "#F59E0B",
        title: "Peak rush hour shifted to 7:00 PM",
        metric: "+34 order delay",
        time: "Just now",
      },
      {
        id: "r2",
        tag: "MARGIN LEAK",
        dotColor: "#EF4444",
        title: "Operating expenses increased by 14%",
        metric: "-$4,250 variance",
        time: "18m ago",
      },
      {
        id: "r3",
        tag: "INVENTORY",
        dotColor: "#10B981",
        title: "Takeaway packaging depleted by 80%",
        metric: "1.5 Days Buffer",
        time: "42m ago",
      },
    ],
  },

  logistics: {
    key: "logistics",
    industryName: "B2B Logistics & Operations",
    workspaceName: "workspace / freight-ops / fuel-variance",
    rawRows: [
      {
        id: "BOL-10921",
        date: "Nov 04",
        source: "Fleet Telematics",
        amount: "$72,400",
        status: "Fuel Surcharge Miscalculation",
        flagType: "error",
      },
      {
        id: "CAR-44912",
        date: "Nov 05",
        source: "Carrier Brokerage",
        amount: "$53,100",
        status: "Accessorial Detention Fee",
        flagType: "warning",
      },
      {
        id: "INV-60912",
        date: "Nov 06",
        source: "EDI 210 Invoices",
        amount: "$114,800",
        status: "Double-Billed Route",
        flagType: "error",
      },
      {
        id: "WHR-20912",
        date: "Nov 07",
        source: "Depot Management",
        amount: "$22,900",
        status: "Overtime Idle Variance",
        flagType: "neutral",
      },
      {
        id: "TX-99014",
        date: "Nov 08",
        source: "Port Customs Agent",
        amount: "$38,400",
        status: "Tariff Classification Lag",
        flagType: "warning",
      },
    ],
    kpis: [
      {
        label: "Reconciled Freight Spend",
        value: 3890000,
        prefix: "$",
        delta: "-8.4%",
        isPositive: true,
        sublabel: "Cost reduction achieved",
      },
      {
        label: "Audit Pass Accuracy",
        value: 99.6,
        suffix: "%",
        delta: "+1.2% Gain",
        isPositive: true,
        sublabel: "Automated verification",
      },
      {
        label: "Carrier Overcharge Recovery",
        value: 48920,
        prefix: "$",
        delta: "100% Recouped",
        isPositive: true,
        sublabel: "Invoiced claims approved",
      },
    ],
    chartPoints: [
      { label: "Jan", value: 190, formatted: "$190,000" },
      { label: "Feb", value: 240, formatted: "$240,000" },
      { label: "Mar", value: 285, formatted: "$285,000" },
      { label: "Apr", value: 330, formatted: "$330,000" },
      { label: "May", value: 395, formatted: "$395,000" },
      { label: "Jun", value: 440, formatted: "$440,000" },
      { label: "Jul", value: 480, formatted: "$480,000" },
    ],
    peakIndex: 6,
    peakLabel: "Recovered Capital: +$480K",
    resolvedInsight: "Carrier EDI duplicate routing fee of $11,400 flagged before payment remittance. Net cash variance protected.",
    bentoBars: [
      {
        label: "Full Truckload (FTL)",
        value: 50,
        percentage: "50%",
        amount: "$1,945,000",
        color: "#134E4A",
      },
      {
        label: "Less-than-Truckload (LTL)",
        value: 28,
        percentage: "28%",
        amount: "$1,089,200",
        color: "#D97706",
      },
      {
        label: "Cold-Chain Reefer Express",
        value: 16,
        percentage: "16%",
        amount: "$622,400",
        color: "#10B981",
      },
      {
        label: "Last-Mile Warehousing",
        value: 6,
        percentage: "6%",
        amount: "$233,400",
        color: "#64748B",
      },
    ],
    chatScenario: {
      userQuestion: "Why did the East Coast freight corridor exhibit significant cost variance?",
      aiSummary:
        "Identified duplicate EDI 210 invoicing and out-of-contract diesel fuel surcharges from partner carriers.",
      aiChips: [
        { label: "Duplicate EDI -$11,400", type: "critical" },
        { label: "Fuel Surcharge +8.4%", type: "warning" },
        { label: "Audit Accuracy 99.6%", type: "neutral" },
      ],
      followUpHint: "Ask: 'Submit reimbursement claim to freight broker now'...",
      conversations: [
        {
          id: "log-c1",
          time: "09:05 AM",
          userRole: "Head of Logistics",
          userQuestion: "Why did the East Coast freight corridor exhibit significant cost variance?",
          aiSummary:
            "Identified duplicate EDI 210 invoicing and out-of-contract diesel fuel surcharges from partner carriers.",
          aiChips: [
            { label: "Duplicate EDI -$11,400", type: "critical" },
            { label: "Fuel Surcharge +8.4%", type: "warning" },
            { label: "Audit Accuracy 99.6%", type: "neutral" },
          ],
        },
        {
          id: "log-c2",
          time: "09:12 AM",
          userRole: "Dispute Officer",
          userQuestion: "Has the freight carrier confirmed our reimbursement claim?",
          aiSummary:
            "Cryptographic audit trail delivered. Logistics partner approved an $11,400 credit refund for this billing cycle.",
          aiChips: [
            { label: "Dispute Approved", type: "success" },
            { label: "Refund: $11,400", type: "success" },
            { label: "Audit Hash Verified", type: "neutral" },
          ],
        },
        {
          id: "log-c3",
          time: "09:20 AM",
          userRole: "Fleet Dispatcher",
          userQuestion: "What fleet schedule adjustment avoids marine terminal detention fees?",
          aiSummary:
            "Shift container docking window to 05:00–08:00 AM to cut truck dwell times by 42 minutes per rig with zero detention fees.",
          aiChips: [
            { label: "Queue: -42 Mins", type: "success" },
            { label: "Detention Fee: $0", type: "success" },
            { label: "On-time: 98.4%", type: "neutral" },
          ],
        },
      ],
    },
    anomalies: [
      {
        id: "l1",
        tag: "BILLING AUDIT",
        dotColor: "#EF4444",
        title: "Double-billed route EDI 210 detected",
        metric: "$11,400 claim",
        time: "8m ago",
      },
      {
        id: "l2",
        tag: "FUEL VARIANCE",
        dotColor: "#F59E0B",
        title: "Carrier fuel surcharge exceeded index threshold",
        metric: "+8.4% drift",
        time: "26m ago",
      },
      {
        id: "l3",
        tag: "ACCURACY GAIN",
        dotColor: "#10B981",
        title: "Audit pass accuracy reached SLA target",
        metric: "99.6% Clean",
        time: "1h ago",
      },
    ],
  },
};

