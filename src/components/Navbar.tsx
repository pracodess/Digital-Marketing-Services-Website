import React, { useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { AGENCY_CONFIG } from '../data/services';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onNavigateHome?: () => void;
}

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'ROI Calculator', href: '#roi-calculator' },
  { label: 'Membership', href: '#membership' },
  { label: 'Free Audit', href: '#audit' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  isDark,
  onToggleTheme,
  onNavigateHome,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileOpen(false);
    if (onNavigateHome) {
      onNavigateHome();
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 dark:border-white/10 bg-white/85 dark:bg-[#070B16]/85 backdrop-blur-md transition-colors duration-200">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6">
        {/* Left: Wordmark + letter-spaced subtitle */}
        <a
          href="#top"
          onClick={handleLinkClick}
          className="flex flex-col leading-none shrink-0 group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3B82F6] rounded"
        >
          <span className="font-heading text-xl font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
            {AGENCY_CONFIG.brandName}
          </span>
          <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#3B82F6] whitespace-nowrap">
            {AGENCY_CONFIG.brandSubtitle}
          </span>
        </a>

        {/* Center: Desktop nav links */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-medium text-slate-600 dark:text-slate-300"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onNavigateHome}
              className="whitespace-nowrap shrink-0 py-1 hover:text-slate-950 dark:hover:text-white transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3B82F6] rounded"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Theme toggle + Primary CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-[#0E1424] text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-white/25 hover:text-slate-950 dark:hover:text-white transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <a
            href="#audit"
            onClick={onNavigateHome}
            className="hidden sm:inline-flex items-center justify-center rounded-xl bg-[#3B82F6] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 active:scale-[0.98] transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]"
          >
            Book Free Audit
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-panel"
            className="inline-flex lg:hidden h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-[#0E1424] text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-white/25 transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet slide-down panel */}
      {mobileOpen && (
        <div
          id="mobile-nav-panel"
          className="lg:hidden border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E1424] px-4 py-4 shadow-lg"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="rounded-xl px-3 py-3 text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#audit"
              onClick={handleLinkClick}
              className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-[#3B82F6] px-4 py-3 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
            >
              Book Free Audit
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
