import React from 'react';
import { Check, Plus } from 'lucide-react';
import { ServiceItem } from '../data/services';
import { formatINR } from '../utils/format';
import { getDiscountedPrice } from '../utils/pricing';

interface ServiceCardProps {
  service: ServiceItem;
  isSelected: boolean;
  onToggle: (id: string) => void;
  effectiveDiscountPercent: number;
  isPreviewOnly: boolean;
  isIndustryRecommended?: boolean;
  isRoiRecommended?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  isSelected,
  onToggle,
  effectiveDiscountPercent,
  isPreviewOnly,
  isIndustryRecommended = false,
  isRoiRecommended = false,
}) => {
  const hasDiscount = effectiveDiscountPercent > 0;
  const discountedPrice = getDiscountedPrice(service.price, effectiveDiscountPercent);
  const showRecommendedBadge =
    service.recommended || isIndustryRecommended || isRoiRecommended;

  const badgeLabel = isRoiRecommended
    ? 'ROI Match'
    : 'Recommended';

  const borderClass = isSelected
    ? 'border-[#3B82F6] ring-1 ring-[#3B82F6]/40 shadow-[0_0_28px_-10px_rgba(59,130,246,0.4)]'
    : isRoiRecommended
      ? 'border-[#F59E0B] ring-2 ring-[#F59E0B]/35 shadow-[0_0_32px_-10px_rgba(245,158,11,0.4)]'
      : isIndustryRecommended
        ? 'border-[#3B82F6]/80 ring-1 ring-[#3B82F6]/25 shadow-[0_0_30px_-12px_rgba(59,130,246,0.35)]'
        : service.recommended
          ? 'border-[#3B82F6]/65 shadow-[0_0_32px_-12px_rgba(59,130,246,0.38)]'
          : 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20';

  return (
    <article
      id={`service-${service.id}`}
      className={`scroll-mt-24 flex h-full flex-col justify-between rounded-2xl border bg-white dark:bg-[#0E1424] p-6 transition-all duration-200 hover:-translate-y-0.5 ${borderClass}`}
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-heading text-lg font-semibold leading-snug text-slate-900 dark:text-white">
            {service.name}
          </h3>
          {showRecommendedBadge && (
            <span
              className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold whitespace-nowrap ${
                isRoiRecommended
                  ? 'bg-[#F59E0B]/20 text-amber-700 dark:text-[#F59E0B]'
                  : 'bg-[#3B82F6]/15 text-[#3B82F6] dark:text-blue-400'
              }`}
            >
              {badgeLabel}
            </span>
          )}
        </div>

        {/* Price Block */}
        <div className="mt-4">
          {hasDiscount ? (
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm tabular-nums text-slate-400 line-through">
                  {formatINR(service.price)}
                </span>
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-[#25D366]">
                  {effectiveDiscountPercent}% OFF{isPreviewOnly ? ' Preview' : ''}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-3xl font-bold tabular-nums text-emerald-600 dark:text-[#25D366]">
                  {formatINR(discountedPrice)}
                </span>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {service.billingCycle}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-3xl font-bold tabular-nums text-slate-900 dark:text-white">
                {formatINR(service.price)}
              </span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {service.billingCycle}
              </span>
            </div>
          )}
        </div>

        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {service.description}
        </p>

        <ul className="mt-5 space-y-2.5">
          {service.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300"
            >
              <Check
                className="mt-0.5 h-4 w-4 shrink-0 text-[#3B82F6]"
                aria-hidden="true"
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 pt-2">
        {service.footnote && (
          <p className="mb-3 text-xs italic text-slate-500 dark:text-slate-400">
            {service.footnote}
          </p>
        )}

        <button
          type="button"
          onClick={() => onToggle(service.id)}
          aria-pressed={isSelected}
          aria-label={
            isSelected ? `Remove ${service.name}` : `Select ${service.name}`
          }
          className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-150 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6] ${
            isSelected
              ? 'bg-[#3B82F6] text-white shadow-sm hover:bg-blue-500'
              : 'border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-white/[0.03] text-slate-900 dark:text-white hover:border-[#3B82F6] hover:bg-[#3B82F6]/10'
          }`}
        >
          {isSelected ? (
            <>
              <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Selected</span>
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Select Service</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
};
