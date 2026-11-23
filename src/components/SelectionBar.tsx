import React from 'react';
import { X } from 'lucide-react';
import { AGENCY_CONFIG } from '../data/services';
import { formatINR } from '../utils/format';
import {
  buildServicesWhatsAppMessage,
  buildWhatsAppUrl,
  PricingSummary,
} from '../utils/pricing';
import { WhatsAppIcon } from './WhatsAppIcon';

interface SelectionBarProps {
  summary: PricingSummary;
  onClearAll: () => void;
}

export const SelectionBar: React.FC<SelectionBarProps> = ({ summary, onClearAll }) => {
  if (summary.serviceCount === 0) {
    return null;
  }

  const message = buildServicesWhatsAppMessage(summary);
  const whatsappUrl = buildWhatsAppUrl(AGENCY_CONFIG.whatsappNumber, message);
  const serviceLabel = summary.serviceCount === 1 ? 'service' : 'services';

  return (
    <aside
      aria-label="Selected services summary"
      className="fixed bottom-0 inset-x-0 z-30 border-t border-slate-200 dark:border-white/15 bg-white/95 dark:bg-[#0E1424]/95 backdrop-blur-md shadow-[0_-8px_30px_rgba(0,0,0,0.25)]"
    >
      <div className="mx-auto flex max-w-[1200px] flex-wrap sm:flex-nowrap items-center justify-between gap-2.5 sm:gap-3 px-4 py-2.5 sm:py-3 sm:px-6">
        <div className="min-w-0 flex flex-col sm:flex-row sm:items-center sm:gap-3">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs sm:text-sm font-medium text-slate-900 dark:text-white">
            <span className="font-mono tabular-nums font-bold">
              {summary.serviceCount} {serviceLabel} selected
            </span>
            <span aria-hidden="true" className="text-slate-400">
              |
            </span>
            <span className="font-mono tabular-nums font-bold text-[#3B82F6] dark:text-blue-400">
              Total: {formatINR(summary.finalTotal)}
            </span>
          </div>

          {summary.activeMembership && (
            <span className="text-[11px] sm:text-xs text-emerald-700 dark:text-[#25D366] truncate">
              Includes {summary.activeMembership.discountPercent}% OFF +{' '}
              {formatINR(summary.membershipFee)}/yr membership
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0 ml-auto">
          <button
            type="button"
            onClick={onClearAll}
            aria-label="Clear selected services"
            title="Clear selection"
            className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-white/15 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl bg-[#25D366] px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-slate-950 hover:bg-[#20bd5a] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
          >
            <WhatsAppIcon className="h-4 w-4 shrink-0" />
            <span>Get Quote on WhatsApp</span>
          </a>
        </div>
      </div>
    </aside>
  );
};
