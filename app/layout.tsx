import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://karanm-portfolio.vercel.app"),
  title: "Karan M — B.Tech AI & Data Science | ML Engineer Portfolio",
  description: "Portfolio of Karan M, B.Tech in Artificial Intelligence & Data Science (SKCET, 2026). Focused on explainable ML, NLP pipelines, and clean backend systems.",
  keywords: ["Karan M", "Machine Learning", "Data Science", "AI Engineer", "Portfolio", "XAI", "NLP", "Next.js"],
  authors: [{ name: "Karan M", url: "https://github.com/karanhub356" }],
  creator: "Karan M",
  openGraph: {
    type: "website",
    url: "https://karanm-portfolio.vercel.app",
    title: "Karan M — B.Tech AI & Data Science | ML Engineer Portfolio",
    description: "Portfolio of Karan M. Explainable ML, NLP pipelines, and clean backend systems.",
    siteName: "Karan M — Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Karan M — ML Engineer Portfolio",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karan M — B.Tech AI & Data Science | ML Engineer Portfolio",
    description: "Portfolio of Karan M. Explainable ML, NLP pipelines, and clean backend systems.",
    images: ["/og-image.png"],
    creator: "@karanm356",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
