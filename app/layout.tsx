import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "@/components/PostHogProvider";
import { PostHogPageView } from "@/components/PostHogPageView";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Satvik Vejendla — GPU Architect",
  description:
    "M.S. CS @ Northwestern | SWE @ J.P. Morgan & TeachShare | AI/ML Engineer. Full-stack dev with deep compute experience from CUDA to LLMs.",
  keywords: ["Satvik Vejendla", "Software Engineer", "AI", "Machine Learning", "Northwestern", "Portfolio"],
  openGraph: {
    title: "Satvik Vejendla — GPU Architect",
    description: "Software Engineer specializing in AI systems, CUDA, and full-stack development.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="overflow-x-hidden">
        <PostHogProvider>
          <PostHogPageView />
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
