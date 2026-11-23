import React, { useState } from 'react';
import { AlertCircle, Check, FileDown, Loader2 } from 'lucide-react';
import { generateRateCardPdf } from '../utils/pdfGenerator';

interface DownloadRateCardButtonProps {
  variant?: 'outline' | 'floating' | 'compact';
  className?: string;
}

type DownloadStatus = 'idle' | 'loading' | 'success' | 'error';

export const DownloadRateCardButton: React.FC<DownloadRateCardButtonProps> = ({
  variant = 'outline',
  className = '',
}) => {
  const [status, setStatus] = useState<DownloadStatus>('idle');

  const handleDownload = async () => {
    if (status === 'loading') return;
    setStatus('loading');

    try {
      await generateRateCardPdf();
      setStatus('success');
      window.setTimeout(() => {
        setStatus((prev) => (prev === 'success' ? 'idle' : prev));
      }, 3200);
    } catch {
      setStatus('error');
      window.setTimeout(() => {
        setStatus((prev) => (prev === 'error' ? 'idle' : prev));
      }, 4500);
    }
  };

  const baseStyles =
    variant === 'floating'
      ? 'inline-flex items-center gap-1.5 rounded-full border border-slate-300 dark:border-white/15 bg-white/90 dark:bg-[#0E1424]/90 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 shadow-md backdrop-blur-md hover:border-[#3B82F6] transition-colors'
      : variant === 'compact'
        ? 'inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-white/15 bg-white dark:bg-[#0E1424] px-3.5 py-2 text-xs font-semibold text-slate-800 dark:text-slate-100 hover:border-[#3B82F6] transition-colors'
        : 'inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-white/15 bg-white dark:bg-[#0E1424] px-4 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-100 hover:border-[#3B82F6] hover:text-[#3B82F6] dark:hover:text-blue-400 transition-colors';

  const statusStyles =
    status === 'success'
      ? 'border-[#25D366]/60 text-emerald-700 dark:text-[#25D366]'
      : status === 'error'
        ? 'border-rose-500/60 text-rose-600 dark:text-rose-400'
        : '';

  return (
    <div className="inline-flex flex-col items-start">
      <button
        type="button"
        onClick={handleDownload}
        disabled={status === 'loading'}
        aria-label="Download Rate Card (PDF)"
        className={`${baseStyles} ${statusStyles} cursor-pointer whitespace-nowrap disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6] ${className}`}
      >
        {status === 'loading' && (
          <>
            <Loader2 className="h-4 w-4 animate-spin shrink-0" aria-hidden="true" />
            <span>Generating PDF...</span>
          </>
        )}
        {status === 'success' && (
          <>
            <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Rate Card Downloaded</span>
          </>
        )}
        {status === 'error' && (
          <>
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Download failed — retry</span>
          </>
        )}
        {status === 'idle' && (
          <>
            <FileDown className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Download Rate Card (PDF)</span>
          </>
        )}
      </button>
    </div>
  );
};
