import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { AGENCY_CONFIG } from '../data/services';

interface NotFoundPageProps {
  onBackHome: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onBackHome }) => {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
      <div className="mx-auto max-w-lg rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E1424] p-8 sm:p-10 text-center">
        <span className="font-mono text-sm font-bold text-[#3B82F6]">
          404 — Page Not Found
        </span>
        <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          This page doesn’t exist
        </h1>
        <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
          The link you followed may be broken or moved. Return to the{' '}
          {AGENCY_CONFIG.brandName} homepage to explore services, calculate ROI, or book
          your free audit.
        </p>

        <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#3B82F6] px-5 py-3 text-sm font-semibold text-white hover:bg-blue-500 transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back to Home</span>
          </button>
          <a
            href="/#audit"
            onClick={(e) => {
              e.preventDefault();
              onBackHome();
              window.setTimeout(() => {
                document.getElementById('audit')?.scrollIntoView({ behavior: 'smooth' });
              }, 80);
            }}
            className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl border border-slate-300 dark:border-white/15 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-slate-100 hover:border-[#3B82F6] transition-colors"
          >
            Book Free Audit
          </a>
        </div>
      </div>
    </main>
  );
};
