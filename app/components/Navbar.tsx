"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ProgressIndicator from "./ProgressIndicator";

const navLinks = [
  { href: "/", label: "About" },
  { href: "/projects", label: "Projects" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-sm border-b border-zinc-800">
      <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-14">
          <Link
            href="/"
            className="text-lg font-semibold text-zinc-100 hover:text-emerald-400 transition-colors"
          >
            Louis Filip
          </Link>

          <div className="hidden sm:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-emerald-400"
                    : "text-zinc-400 hover:text-zinc-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden sm:block">
            <ProgressIndicator />
          </div>

          <button
            className="sm:hidden p-2 text-zinc-400 hover:text-zinc-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="sm:hidden pb-4 border-t border-zinc-800 mt-2 pt-4">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "text-emerald-400"
                      : "text-zinc-400 hover:text-zinc-100"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-zinc-800">
              <ProgressIndicator />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
