import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Link from "next/link";
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
  title: "AI Safety Facts — AI Safety Transparency Dashboard",
  description:
    "Fact-based, source-linked AI safety transparency dashboard. No opinions, no grades — just verifiable facts about AI company safety practices.",
};

function Nav() {
  return (
    <nav className="border-b border-card-border bg-card-bg/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link
            href="/"
            className="font-mono font-bold text-lg tracking-tight hover:text-accent transition-colors"
          >
            AI Safety Facts
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/"
              className="text-muted hover:text-foreground transition-colors"
            >
              Companies
            </Link>
            <Link
              href="/compare"
              className="text-muted hover:text-foreground transition-colors"
            >
              Compare
            </Link>
            <Link
              href="/timeline"
              className="text-muted hover:text-foreground transition-colors"
            >
              Timeline
            </Link>
            <Link
              href="/about"
              className="text-muted hover:text-foreground transition-colors"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="border-t border-card-border mt-20 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted text-sm">
        AI Safety Facts — Fact-based AI safety transparency. Not affiliated with
        any AI company.
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
