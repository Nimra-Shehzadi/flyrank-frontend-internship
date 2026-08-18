export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-white/5 px-3 py-10 xs:px-4 sm:px-6 sm:py-12"
      role="contentinfo"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 text-xs font-bold text-navy-950"
              aria-hidden="true"
            >
              CP
            </span>
            <span className="text-sm font-semibold text-white sm:text-base">
              Career<span className="text-emerald-400">Pilot</span> AI
            </span>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center gap-4 text-xs text-slate-400 sm:gap-6 sm:text-sm">
              <li>
                <a
                  href="#workspace"
                  className="rounded transition-colors hover:text-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  Analyze
                </a>
              </li>
              <li>
                <a
                  href="#results"
                  className="rounded transition-colors hover:text-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  Results
                </a>
              </li>
              <li>
                <a
                  href="#chat"
                  className="rounded transition-colors hover:text-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  Chat
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="rounded transition-colors hover:text-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  How It Works
                </a>
              </li>
            </ul>
          </nav>

          <p className="text-xs text-slate-500 sm:text-sm">
            &copy; {year} CareerPilot AI
          </p>
        </div>
      </div>
    </footer>
  );
}
