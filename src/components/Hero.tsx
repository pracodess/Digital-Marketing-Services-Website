import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { AGENCY_CONFIG, IndustryTab } from '../data/services';
import { IndustryTabs } from './IndustryTabs';

interface HeroProps {
  activeIndustry: IndustryTab;
  onSelectHeroIndustry: (tab: IndustryTab) => void;
  selectedServiceIds: string[];
  onSelectBundle: (ids: string[]) => void;
}

export const Hero: React.FC<HeroProps> = ({
  activeIndustry,
  onSelectHeroIndustry,
  selectedServiceIds,
  onSelectBundle,
}) => {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-slate-200/80 dark:border-white/10 pt-14 pb-16 sm:pt-20 sm:pb-24"
    >
      {/* Subtle grid & radial ambient backdrop */}
      <div
        aria-hidden="true"
        className="hero-grid-bg pointer-events-none absolute inset-0 opacity-75"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-[440px] w-[760px] -translate-x-1/2 rounded-full bg-[#3B82F6]/15 dark:bg-[#3B82F6]/18 blur-[120px]"
      />

      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="animate-fade-up mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-3.5 py-1.5 text-xs font-medium text-blue-700 dark:text-blue-300">
            {AGENCY_CONFIG.heroBadge}
          </div>

          <h1
            className="font-heading font-bold tracking-tight text-slate-900 dark:text-white leading-[1.12]"
            style={{
              fontSize: 'clamp(2.25rem, 4.8vw, 3.75rem)',
              textWrap: 'balance',
            }}
          >
            {AGENCY_CONFIG.heroHeadline}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            {AGENCY_CONFIG.heroSubheading}
          </p>

          <p className="mt-3 font-mono text-xs sm:text-sm tracking-wide text-amber-600 dark:text-amber-400">
            “{AGENCY_CONFIG.tagline}”
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href="#audit"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#3B82F6] px-6 py-3.5 text-sm sm:text-base font-semibold text-white shadow-sm shadow-blue-500/20 hover:bg-blue-500 active:scale-[0.98] transition-all duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]"
            >
              Book Free Audit
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <a
              href="#services"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-white/15 bg-white/80 dark:bg-[#0E1424]/80 px-6 py-3.5 text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-100 hover:border-slate-400 dark:hover:border-white/30 hover:bg-white dark:hover:bg-[#131B30] transition-all duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]"
            >
              View Services
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          {/* Compact Industry Quick-Tabs */}
          <div className="mt-8">
            <p className="mb-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              See recommended packages for your business type:
            </p>
            <IndustryTabs
              compact
              activeTab={activeIndustry}
              onSelectTab={onSelectHeroIndustry}
              selectedServiceIds={selectedServiceIds}
              onSelectBundle={onSelectBundle}
            />
          </div>
        </div>

        {/* Trust stats row */}
        <div className="animate-fade-up-delay mt-12 sm:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {AGENCY_CONFIG.trustStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#0E1424]/90 px-5 py-5 text-center transition-colors"
            >
              <div className="font-mono text-2xl sm:text-3xl font-bold tabular-nums text-slate-900 dark:text-white">
                {stat.value}
              </div>
              <div className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
