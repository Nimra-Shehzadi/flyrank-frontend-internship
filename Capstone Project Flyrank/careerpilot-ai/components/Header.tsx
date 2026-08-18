"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { href: "#workspace", label: "Analyze" },
  { href: "#results", label: "Results" },
  { href: "#chat", label: "Chat" },
  { href: "#how-it-works", label: "How It Works" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-navy-950/85 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-3 py-3 xs:px-4 sm:px-6 sm:py-4">
        <a
          href="#"
          className="flex min-w-0 items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
          aria-label="CareerPilot AI home"
        >
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 text-xs font-bold text-navy-950 sm:h-9 sm:w-9 sm:text-sm"
            aria-hidden="true"
          >
            CP
          </span>
          <span className="truncate text-base font-bold tracking-tight text-white sm:text-lg">
            Career<span className="text-emerald-400">Pilot</span>
            <span className="hidden xs:inline"> AI</span>
          </span>
        </a>

        <nav aria-label="Main navigation" className="hidden items-center gap-5 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate-400 transition-colors hover:text-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded px-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            className="hidden xs:inline-flex"
            onClick={() =>
              document.getElementById("workspace")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Analyze a Job
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="xs:hidden"
            onClick={() =>
              document.getElementById("workspace")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Analyze
          </Button>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-300 transition-colors hover:bg-white/5 md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span aria-hidden="true">{menuOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="border-t border-white/5 px-3 py-3 md:hidden xs:px-4"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block rounded-lg px-3 py-2.5 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-emerald-400"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
