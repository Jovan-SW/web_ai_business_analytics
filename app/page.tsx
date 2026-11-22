import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/ui/hero-section-2";
import { ProblemSolutionSection } from "@/components/problem-solution/ProblemSolutionSection";
import { ProductSection } from "@/components/product/ProductSection";
import { HowItWorksSection } from "@/components/how-it-works";
import { FaqSection } from "@/components/faq";
import { Footer } from "@/components/footer";

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
              "Jovix unifies your entire business analysis lifecycle through three foundational pillars—eliminating operational blind spots, automating variance detection, and turning raw ledgers into strategic execution.",
          }}
        />

        {/* 3. Product Section: Visual Before & After (From Chaos to Clarity) */}
        <ProductSection />

        {/* 4. Problem & Solution Section: Dark Swiss Grid */}
        <ProblemSolutionSection />

        {/* 5. How It Works Section: 4-Step Interactive Architecture */}
        <HowItWorksSection />

        {/* 6. Frequently Asked Questions Section */}
        <FaqSection />

        {/* 7. Modular Swiss Minimal Footer */}
        <Footer />
      </main>
    </div>
  );
}
