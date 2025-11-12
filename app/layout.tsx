import type { Metadata } from "next";
import Header from "../components/Header";
import "./globals.css";


export const metadata: Metadata = {
  title: "HashNotes | Web3 IPFS Notes",
  description:
    "Write and pin notes to IPFS to get unique CIDs. A clean, modern Next.js + TailwindCSS DApp demo for portfolio.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  keywords: [
    "HashNotes",
    "Web3",
    "IPFS",
    "CID",
    "DApp",
    "Next.js",
    "TailwindCSS",
    "TypeScript",
    "Decentralized storage",
    "Portfolio",
  ],
  applicationName: "HashNotes",
  openGraph: {
    title: "HashNotes | Web3 IPFS Notes",
    description:
      "Write and pin notes to IPFS to get unique CIDs. A clean, modern Next.js + TailwindCSS DApp demo for portfolio.",
    siteName: "HashNotes",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "HashNotes logo",
      },
    ],
    type: "website",
    locale: "en",
  },
  twitter: {
    card: "summary",
    title: "HashNotes | Web3 IPFS Notes",
    description:
      "Write and pin notes to IPFS to get unique CIDs. A clean, modern Next.js + TailwindCSS DApp demo for portfolio.",
    images: ["/logo.svg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased font-sans bg-white text-slate-900 dark:bg-black dark:text-slate-100`}>
        <Header />
        <main className="mx-auto max-w-6xl px-6">
          {children}
        </main>
      </body>
    </html>
  );
}
