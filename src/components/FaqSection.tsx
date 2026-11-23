import React, { useRef, useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { AGENCY_CONFIG, FAQ_ITEMS } from '../data/services';
import { buildWhatsAppUrl } from '../utils/pricing';
import { WhatsAppIcon } from './WhatsAppIcon';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    const lastIndex = FAQ_ITEMS.length - 1;
    let nextIndex: number | null = null;

    if (event.key === 'ArrowDown') {
      nextIndex = index === lastIndex ? 0 : index + 1;
    } else if (event.key === 'ArrowUp') {
      nextIndex = index === 0 ? lastIndex : index - 1;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = lastIndex;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      buttonRefs.current[nextIndex]?.focus();
    }
  };

  const faqWhatsAppUrl = buildWhatsAppUrl(
    AGENCY_CONFIG.whatsappNumber,
    `Hello ${AGENCY_CONFIG.brandName} team, I have a question about your digital marketing and website packages.`
  );

  return (
    <section
      id="faq"
      className="scroll-mt-24 border-t border-slate-200 dark:border-white/10 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#3B82F6]">
              Frequently Asked Questions
            </span>
            <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Clear Answers Before You Start
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-slate-600 dark:text-slate-300">
              Everything local business owners ask about ad spend billing, timelines,
              ownership, GST invoicing, and ongoing support.
            </p>
          </div>

          <div className="space-y-3" role="region" aria-label="Frequently Asked Questions">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openId === item.id;
              const panelId = `${item.id}-panel`;
              const triggerId = `${item.id}-trigger`;

              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border bg-white dark:bg-[#0E1424] transition-colors duration-150 ${
                    isOpen
                      ? 'border-[#3B82F6]/60'
                      : 'border-slate-200 dark:border-white/10'
                  }`}
                >
                  <h3>
                    <button
                      ref={(el) => {
                        buttonRefs.current[index] = el;
                      }}
                      id={triggerId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => handleToggle(item.id)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="flex w-full items-center justify-between gap-4 px-5 sm:px-6 py-4 text-left text-sm sm:text-base font-semibold text-slate-900 dark:text-white cursor-pointer rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]"
                    >
                      <span>{item.question}</span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-slate-500 dark:text-slate-400 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#3B82F6]' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    hidden={!isOpen}
                    className={`px-5 sm:px-6 pb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300 ${
                      isOpen ? 'animate-fade-up' : ''
                    }`}
                  >
                    {item.answer}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Still have questions? card */}
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-[#0E1424] p-6">
            <div className="flex items-start gap-3.5">
              <div
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#3B82F6]/15 text-[#3B82F6]"
                aria-hidden="true"
              >
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                  Still have questions?
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  Message our team directly on WhatsApp and get a clear answer within
                  business hours.
                </p>
              </div>
            </div>

            <a
              href={faqWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-bold text-slate-950 hover:bg-[#20bd5a] transition-colors whitespace-nowrap shrink-0"
            >
              <WhatsAppIcon className="h-4 w-4 shrink-0" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
