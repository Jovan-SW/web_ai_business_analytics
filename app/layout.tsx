import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jovix AI — Analisis Bisnis Cepat & Integrasi Workflow AI",
  description: "Platform AI Workflow & Integration untuk analisis bisnis cepat, cerdas, dan terautomasi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full scroll-smooth antialiased">
      <body className="min-h-full flex flex-col bg-[#F7F5F0] text-[#18221E] selection:bg-[#D97706]/20 selection:text-[#18221E]">
        {children}
      </body>
    </html>
  );
}
