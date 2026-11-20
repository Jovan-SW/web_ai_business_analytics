import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#18221E]">
      {/* 1. Official Navbar Component */}
      <Navbar />

      {/* Landing Page Content Area */}
      <main className="flex-1 flex flex-col items-center">
        {/* Subtle Announcement / Status Pill */}
        <div className="pt-10 sm:pt-14 px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFECE6] border border-[#18221E]/10 text-xs sm:text-sm font-medium text-[#18221E]">
            <span className="flex h-2 w-2 rounded-full bg-[#D97706] animate-pulse" />
            <span className="font-semibold text-[#134E4A]">Jovix Engine v2.0:</span>
            <span className="text-[#18221E]/80">Analisis bisnis 10x lebih cepat dengan integrasi alur kerja AI</span>
          </div>
        </div>

        {/* Hero Section Preview */}
        <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#18221E] leading-[1.15]">
            Analisis Bisnis Cepat &amp; Terautomasi dengan{" "}
            <span className="text-[#134E4A] underline decoration-[#D97706]/60 decoration-wavy decoration-2">
              AI Workflow
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-[#18221E]/75 max-w-2xl mx-auto leading-relaxed">
            Hubungkan data, bangun alur kerja analitik cerdas, dan dapatkan insight strategi bisnis dalam hitungan detik bersama <strong>Jovix AI</strong>.
          </p>

          {/* Quick CTA button preview */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#134E4A] hover:bg-[#0F3F3C] text-white font-semibold text-base shadow-sm hover:shadow-lg hover:shadow-[#134E4A]/25 transition-all duration-200"
            >
              Mulai Analisis Gratis
            </button>
            <button
              type="button"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#FFFFFF] hover:bg-[#EFECE6] text-[#18221E] font-semibold text-base border border-[#18221E]/15 transition-colors"
            >
              Lihat Demo Interaktif
            </button>
          </div>

          {/* Color Palette & Components Spec Card */}
          <div className="mt-16 text-left max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#EFECE6] shadow-sm">
            <div className="flex items-center justify-between border-b border-[#EFECE6] pb-4 mb-5">
              <div>
                <h3 className="text-base font-bold text-[#18221E]">Palette &amp; Design Specs</h3>
                <p className="text-xs text-[#18221E]/60 mt-0.5">Komponen Navbar Jovix AI siap dikembangkan ke section berikutnya</p>
              </div>
              <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-[#134E4A]/10 text-[#134E4A]">
                Ready
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#F7F5F0] border border-[#EFECE6]">
                <div className="w-5 h-5 rounded-md bg-[#F7F5F0] border border-black/10 mb-2" />
                <p className="font-semibold text-[#18221E]">Warm Alabaster</p>
                <p className="text-[11px] text-[#18221E]/60">#F7F5F0</p>
              </div>
              <div className="p-3 rounded-xl bg-[#EFECE6]">
                <div className="w-5 h-5 rounded-md bg-[#EFECE6] border border-black/10 mb-2" />
                <p className="font-semibold text-[#18221E]">Soft Sand</p>
                <p className="text-[11px] text-[#18221E]/60">#EFECE6</p>
              </div>
              <div className="p-3 rounded-xl bg-[#134E4A] text-white">
                <div className="w-5 h-5 rounded-md bg-[#134E4A] border border-white/20 mb-2" />
                <p className="font-semibold">Deep Forest Teal</p>
                <p className="text-[11px] text-white/70">#134E4A</p>
              </div>
              <div className="p-3 rounded-xl bg-[#D97706] text-white">
                <div className="w-5 h-5 rounded-md bg-[#D97706] border border-white/20 mb-2" />
                <p className="font-semibold">Warm Amber AI</p>
                <p className="text-[11px] text-white/70">#D97706</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
