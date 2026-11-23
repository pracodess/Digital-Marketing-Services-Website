import React from 'react';
import { Instagram, Linkedin, Youtube } from 'lucide-react';
import { AGENCY_CONFIG } from '../data/services';
import { DownloadRateCardButton } from './DownloadRateCardButton';

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  Instagram: <Instagram className="h-4 w-4" aria-hidden="true" />,
  LinkedIn: <Linkedin className="h-4 w-4" aria-hidden="true" />,
  YouTube: <Youtube className="h-4 w-4" aria-hidden="true" />,
};

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#070B16] pt-12 pb-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-slate-200 dark:border-white/10">
          {/* Brand + Tagline + About */}
          <div className="md:col-span-1">
            <a href="#top" className="inline-flex flex-col leading-none">
              <span className="font-heading text-xl font-bold text-slate-900 dark:text-white">
                {AGENCY_CONFIG.brandName}
              </span>
              <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#3B82F6]">
                {AGENCY_CONFIG.brandSubtitle}
              </span>
            </a>
            <p className="mt-3 font-mono text-xs text-amber-600 dark:text-amber-400">
              “{AGENCY_CONFIG.tagline}”
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {AGENCY_CONFIG.footerAbout}
            </p>
            <div className="mt-5">
              <DownloadRateCardButton variant="compact" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-slate-900 dark:text-white">
              Quick Links
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a
                  href="#services"
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Services &amp; Pricing
                </a>
              </li>
              <li>
                <a
                  href="#roi-calculator"
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  ROI Calculator
                </a>
              </li>
              <li>
                <a
                  href="#membership"
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  VIP Annual Membership
                </a>
              </li>
              <li>
                <a
                  href="#results"
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Results &amp; Reviews
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <a
                  href="#audit"
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Book Free Audit
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-slate-900 dark:text-white">
              Connect With Us
            </h3>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Follow our latest local growth playbooks &amp; updates.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              {AGENCY_CONFIG.socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.name} (${social.handle})`}
                  title={`${social.name} — ${social.handle}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0E1424] px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-[#3B82F6] hover:text-[#3B82F6] dark:hover:text-blue-400 transition-colors"
                >
                  {SOCIAL_ICONS[social.name]}
                  <span>{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
          <p>
            &copy; {AGENCY_CONFIG.copyrightYear} {AGENCY_CONFIG.brandName}. All rights
            reserved.
          </p>
          <p>Domain &amp; hosting are separate on website packages.</p>
        </div>
      </div>
    </footer>
  );
};
