import React from 'react';
import { AGENCY_CONFIG } from '../data/services';
import { buildWhatsAppUrl } from '../utils/pricing';
import { DownloadRateCardButton } from './DownloadRateCardButton';
import { WhatsAppIcon } from './WhatsAppIcon';

interface FloatingWhatsAppProps {
  isSelectionBarVisible: boolean;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  isSelectionBarVisible,
}) => {
  const whatsappUrl = buildWhatsAppUrl(
    AGENCY_CONFIG.whatsappNumber,
    AGENCY_CONFIG.whatsappDefaultGreeting
  );

  return (
    <div
      className={`fixed right-4 z-40 flex flex-col items-end gap-2 transition-all duration-200 ${
        isSelectionBarVisible ? 'bottom-24 sm:bottom-20' : 'bottom-5'
      }`}
    >
      <DownloadRateCardButton
        variant="floating"
        className="hidden sm:inline-flex"
      />

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Us"
        className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-bold text-slate-950 shadow-lg shadow-[#25D366]/25 hover:bg-[#20bd5a] active:scale-[0.98] transition-all duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
      >
        <WhatsAppIcon className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
        <span>WhatsApp Us</span>
      </a>
    </div>
  );
};
