import React from 'react';
import { ArrowRight, Award, Check, Eye } from 'lucide-react';
import { MembershipPlan } from '../data/services';
import { formatINR } from '../utils/format';

interface MembershipCardProps {
  plan: MembershipPlan;
  isSelected: boolean;
  isPreviewActive: boolean;
  onSelect: (id: MembershipPlan['id']) => void;
  onTogglePreview: (id: MembershipPlan['id']) => void;
}

export const MembershipCard: React.FC<MembershipCardProps> = ({
  plan,
  isSelected,
  isPreviewActive,
  onSelect,
  onTogglePreview,
}) => {
  const isGold = plan.id === 'gold';

  const cardClasses = isGold
    ? isSelected
      ? 'border-[#F59E0B] ring-2 ring-[#F59E0B]/40 shadow-[0_0_40px_-10px_rgba(245,158,11,0.45)]'
      : 'border-[#F59E0B]/60 shadow-[0_0_34px_-12px_rgba(245,158,11,0.3)] hover:border-[#F59E0B]'
    : isSelected
      ? 'border-[#3B82F6] ring-2 ring-[#3B82F6]/40 shadow-[0_0_34px_-10px_rgba(59,130,246,0.4)]'
      : 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/25';

  return (
    <article
      className={`relative flex h-full flex-col justify-between rounded-2xl border bg-white dark:bg-[#0E1424] p-7 sm:p-8 transition-all duration-200 ${cardClasses}`}
    >
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border ${
                isGold
                  ? 'border-[#F59E0B]/40 bg-[#F59E0B]/15 text-[#F59E0B]'
                  : 'border-slate-300 dark:border-slate-500/40 bg-slate-100 dark:bg-slate-400/10 text-slate-600 dark:text-slate-300'
              }`}
              aria-hidden="true"
            >
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-heading text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                {plan.name}
              </h3>
              <span
                className={`inline-block text-xs font-semibold ${
                  isGold
                    ? 'text-amber-600 dark:text-amber-400'
                    : 'text-[#3B82F6] dark:text-blue-400'
                }`}
              >
                {plan.discountBadge}
              </span>
            </div>
          </div>

          {plan.popularBadge && (
            <span className="rounded-full bg-[#F59E0B] px-3 py-1 text-xs font-bold text-slate-950 whitespace-nowrap">
              {plan.popularBadge}
            </span>
          )}
        </div>

        <div className="mt-6 flex items-baseline gap-2">
          <span className="font-mono text-3xl sm:text-4xl font-bold tabular-nums text-slate-900 dark:text-white">
            {formatINR(plan.price)}
          </span>
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {plan.billingLabel}
          </span>
        </div>

        <ul className="mt-6 space-y-3">
          {plan.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300"
            >
              <Check
                className={`mt-0.5 h-4 w-4 shrink-0 ${
                  isGold ? 'text-[#F59E0B]' : 'text-[#3B82F6]'
                }`}
                aria-hidden="true"
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <button
          type="button"
          onClick={() => onSelect(plan.id)}
          aria-pressed={isSelected}
          className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold transition-all duration-150 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 ${
            isGold
              ? isSelected
                ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300/60 focus-visible:outline-[#F59E0B]'
                : 'bg-[#F59E0B] text-slate-950 hover:bg-amber-400 focus-visible:outline-[#F59E0B]'
              : isSelected
                ? 'bg-blue-500 text-white ring-2 ring-blue-400/50 focus-visible:outline-[#3B82F6]'
                : 'bg-[#3B82F6] text-white hover:bg-blue-500 focus-visible:outline-[#3B82F6]'
          }`}
        >
          {isSelected ? (
            <>
              <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{isGold ? 'Gold Member Selected' : 'Silver Member Selected'}</span>
            </>
          ) : (
            <>
              <span>{plan.selectButtonLabel}</span>
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => onTogglePreview(plan.id)}
          aria-pressed={isPreviewActive}
          className={`inline-flex w-full items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-medium transition-colors duration-150 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6] ${
            isPreviewActive
              ? 'border-[#25D366] bg-[#25D366]/10 text-emerald-700 dark:text-[#25D366]'
              : 'border-slate-300 dark:border-white/15 bg-transparent text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-white/30 hover:bg-slate-100 dark:hover:bg-white/5'
          }`}
        >
          <Eye className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>
            {isPreviewActive
              ? `Hide ${plan.discountPercent}% OFF Preview`
              : plan.previewButtonLabel}
          </span>
        </button>

        {isPreviewActive && (
          <p className="text-center text-xs text-emerald-700 dark:text-[#25D366]">
            Showing {plan.discountPercent}% OFF rates in{' '}
            <a href="#services" className="underline font-medium">
              Services above
            </a>
            .
          </p>
        )}
      </div>
    </article>
  );
};
