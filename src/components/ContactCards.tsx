import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { AGENCY_CONFIG } from '../data/services';
import { buildWhatsAppUrl } from '../utils/pricing';
import { WhatsAppIcon } from './WhatsAppIcon';

export const ContactCards: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Card 1: Direct Phone & WhatsApp Desk */}
      <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E1424] p-6 sm:p-8">
        <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white">
          Direct Phone &amp; WhatsApp Desk
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Call or message any of our direct lines for quick quotes and campaign
          inquiries.
        </p>

        <div className="mt-6 divide-y divide-slate-200 dark:divide-white/10">
          {AGENCY_CONFIG.deskLines.map((line) => {
            const whatsappHref = buildWhatsAppUrl(line.whatsappNumber, 'Hello there');
            return (
              <div
                key={line.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-4 first:pt-0 last:pb-0"
              >
                <div>
                  <div className="font-mono text-base font-semibold tabular-nums text-slate-900 dark:text-white">
                    {line.displayNumber}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {line.label}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={`tel:${line.telNumber}`}
                    aria-label={`Call ${line.label} at ${line.displayNumber}`}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 dark:border-white/15 px-3.5 py-2 text-xs font-semibold text-slate-800 dark:text-slate-100 hover:border-[#3B82F6] hover:text-[#3B82F6] dark:hover:text-blue-400 transition-colors whitespace-nowrap"
                  >
                    <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Call</span>
                  </a>

                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`WhatsApp ${line.label} at ${line.displayNumber}`}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-[#25D366]/60 px-3.5 py-2 text-xs font-semibold text-emerald-700 dark:text-[#25D366] hover:bg-[#25D366]/10 transition-colors whitespace-nowrap"
                  >
                    <WhatsAppIcon className="h-3.5 w-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Card 2: Official Email */}
      <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E1424] p-6 sm:p-8">
        <div className="flex items-start gap-3.5">
          <div
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#3B82F6]/30 bg-[#3B82F6]/10 text-[#3B82F6]"
            aria-hidden="true"
          >
            <Mail className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white">
              Official Email
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Prefer email briefs, proposals, or RFPs? Reach us directly.
            </p>

            <div className="mt-4">
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {AGENCY_CONFIG.emailLabel}
              </div>
              <a
                href={`mailto:${AGENCY_CONFIG.email}`}
                className="mt-1 inline-block break-all font-mono text-sm sm:text-base font-semibold text-[#3B82F6] dark:text-blue-400 hover:underline"
              >
                {AGENCY_CONFIG.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
