import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/ui/hero-section-2";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#18221E] selection:bg-[#D97706]/20">
      {/* 1. Official Modular Navbar */}
      <Navbar />

      {/* 2. Official Hero Section with Vertical Text Rotator, Load Slide-In & Expanding Scroll Image */}
      <main className="flex-1 flex flex-col">
        <HeroSection
          title="Turn Complex Business Data into"
          rotatingWords={[
            "High-Conviction Decisions",
            "Predictable Profit Margins",
            "Actionable Growth Strategies",
            "Immediate Cost Reductions",
          ]}
          subtitle="Connect your financial data, ERP systems, and daily operational spreadsheets into a single unified workflow. Automatically surface hidden cost leaks, audit margin health across departments, and receive prioritized executive recommendations to scale your profitability with total confidence."
          callToAction={{
            text: "Start Free Analysis",
            href: "#register",
          }}
          secondaryCallToAction={{
            text: "Explore Live Demo",
            href: "#demo",
          }}
          backgroundImage="https://images.unsplash.com/photo-1655841603567-72ca4d864457?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
          metrics={[
            {
              icon: "speed",
              value: "< 1.8s",
              label: "Multi-Source Data Synthesis",
            },
            {
              icon: "workflow",
              value: "50+ Connectors",
              label: "ERP, SQL, CRM & Spreadsheets",
            },
            {
              icon: "security",
              value: "99.4% Precision",
              label: "Audited Financial Accuracy",
            },
          ]}
          nextSectionPreview={{
            tag: "CONTINUOUS DECISION INTELLIGENCE",
            headline: "From Raw Data to Executive Action",
            description:
              "See how Jovix transforms complex data streams into high-margin strategic execution.",
          }}
        />

        {/* Existing Section (No new sections added) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D97706]">
              Why Jovix?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#18221E] mt-2">
              One unified engine for your entire business analysis workflow
            </h2>
            <p className="mt-4 text-base text-[#18221E]/70 leading-relaxed">
              Beyond static spreadsheets and passive dashboards — Jovix continuously audits live operations, flags margin decay, and drafts boardroom-ready strategic steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#EFECE6] hover:border-[#134E4A]/30 transition-all duration-200 hover:-translate-y-1 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#134E4A]/10 text-[#134E4A] flex items-center justify-center font-bold text-lg mb-4">
                ⚡
              </div>
              <h3 className="text-lg font-bold text-[#18221E]">Instant Ingestion</h3>
              <p className="mt-2 text-sm text-[#18221E]/70 leading-relaxed">
                Automatically ingest live records from SQL databases, QuickBooks, NetSuite, Google Sheets, and CRMs with zero brittle pipelines.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#EFECE6] hover:border-[#134E4A]/30 transition-all duration-200 hover:-translate-y-1 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#D97706]/15 text-[#C2410C] flex items-center justify-center font-bold text-lg mb-4">
                🔍
              </div>
              <h3 className="text-lg font-bold text-[#18221E]">Variance &amp; Leak Detection</h3>
              <p className="mt-2 text-sm text-[#18221E]/70 leading-relaxed">
                Detect hidden vendor overcharges, budget variance spikes, and cash burn runaway weeks before the monthly accounting close.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#EFECE6] hover:border-[#134E4A]/30 transition-all duration-200 hover:-translate-y-1 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#134E4A]/10 text-[#134E4A] flex items-center justify-center font-bold text-lg mb-4">
                📈
              </div>
              <h3 className="text-lg font-bold text-[#18221E]">Actionable Playbooks</h3>
              <p className="mt-2 text-sm text-[#18221E]/70 leading-relaxed">
                Receive prioritized strategic roadmaps and cash runway projections designed specifically for founders and executive teams.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
