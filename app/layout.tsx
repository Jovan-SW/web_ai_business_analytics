import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jovix AI — Real-Time Business Analysis & Workflow Integration",
  description: "Connect business data, detect operational bottlenecks, and get instant executive recommendations to scale your margins.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="min-h-full flex flex-col bg-[#F7F5F0] text-[#18221E] selection:bg-[#D97706]/20 selection:text-[#18221E]">
        {children}
      </body>
    </html>
  );
}
