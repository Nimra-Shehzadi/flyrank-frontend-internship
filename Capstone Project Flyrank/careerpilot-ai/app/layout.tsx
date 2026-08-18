import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CareerPilot AI — AI Career Assistant",
  description:
    "Analyze job descriptions against your skills. Get match scores, skill gaps, interview prep, and AI career coaching.",
  keywords: ["career", "AI", "job analysis", "interview prep", "skills"],
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-navy-950 font-sans text-slate-200 antialiased">
        {children}
      </body>
    </html>
  );
}
