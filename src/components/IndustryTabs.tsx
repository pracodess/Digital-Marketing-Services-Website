import React from 'react';
import { Check, Layers } from 'lucide-react';
import {
  INDUSTRY_RECOMMENDATIONS,
  INDUSTRY_TABS,
  IndustryTab,
} from '../data/services';

interface IndustryTabsProps {
  activeTab: IndustryTab;
  onSelectTab: (tab: IndustryTab) => void;
  selectedServiceIds: string[];
  onSelectBundle: (serviceIds: string[]) => void;
  compact?: boolean;
}

export const IndustryTabs: React.FC<IndustryTabsProps> = ({
  activeTab,
  onSelectTab,
  selectedServiceIds,
  onSelectBundle,
  compact = false,
}) => {
  const recommendation =
    activeTab !== 'All' ? INDUSTRY_RECOMMENDATIONS[activeTab] : null;

  const isBundleFullySelected = recommendation
    ? recommendation.recommendedServiceIds.every((id) =>
        selectedServiceIds.includes(id)
      )
    : false;

  return (
    <div className={compact ? 'mt-7' : 'mb-10'}>
      <div
        role="tablist"
        aria-label={compact ? 'Quick industry filter' : 'Filter services by industry'}
        className={`flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar ${
          compact ? 'justify-start sm:justify-center' : ''
        }`}
      >
        {INDUSTRY_TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelectTab(tab)}
              className={`shrink-0 rounded-xl border transition-all duration-150 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6] ${
                compact ? 'px-3 py-1.5 text-xs font-medium' : 'px-4 py-2 text-xs sm:text-sm font-semibold'
              } ${
                isActive
                  ? 'border-[#3B82F6] bg-[#3B82F6] text-white shadow-sm'
                  : 'border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E1424] text-slate-700 dark:text-slate-300 hover:border-[#3B82F6]/60'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {!compact && recommendation && (
        <div
          role="region"
          aria-live="polite"
          className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-2xl border border-[#3B82F6]/45 bg-[#3B82F6]/10 p-5 sm:p-6"
        >
          <div className="max-w-2xl">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#3B82F6] dark:text-blue-400">
              {recommendation.headline}
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              {recommendation.explanation}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onSelectBundle(recommendation.recommendedServiceIds)}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6] ${
              isBundleFullySelected
                ? 'bg-[#25D366] text-slate-950 hover:bg-[#20bd5a]'
                : 'bg-[#3B82F6] text-white hover:bg-blue-500'
            }`}
          >
            {isBundleFullySelected ? (
              <>
                <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Recommended Bundle Selected</span>
              </>
            ) : (
              <>
                <Layers className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Select Recommended Bundle</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
