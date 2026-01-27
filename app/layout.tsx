import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Louis Filip | Full Stack Developer",
  description:
    "Portfolio of Louis Filip - Full Stack Developer specializing in React, TypeScript, and Node.js",
  metadataBase: new URL("https://lfilip.dev"),
  openGraph: {
    title: "Louis Filip | Full Stack Developer",
    description:
      "Portfolio of Louis Filip - Full Stack Developer specializing in React, TypeScript, and Node.js",
    url: "https://lfilip.dev",
    siteName: "Louis Filip Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Louis Filip | Full Stack Developer",
    description:
      "Portfolio of Louis Filip - Full Stack Developer specializing in React, TypeScript, and Node.js",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-emerald-500 focus:text-zinc-950 focus:rounded-md focus:font-medium"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
