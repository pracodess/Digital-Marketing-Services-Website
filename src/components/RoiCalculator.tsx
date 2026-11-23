import React, { useMemo, useState } from 'react';
import { ArrowUpRight, Calculator, Sparkles } from 'lucide-react';
import {
  ROI_CONFIG,
  ROI_INDUSTRIES,
  RoiIndustry,
} from '../data/services';
import { formatINR } from '../utils/format';
import { buildRoiWhatsAppUrl, calculateRoiMetrics } from '../utils/roi';
import { WhatsAppIcon } from './WhatsAppIcon';

interface RoiCalculatorProps {
  selectedManagementFee: number;
  selectedServiceCount: number;
  onRecommendPackage: (serviceId: 'ads-starter' | 'ads-growth' | 'ads-scale') => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({
  selectedManagementFee,
  selectedServiceCount,
  onRecommendPackage,
}) => {
  const [industry, setIndustry] = useState<RoiIndustry>(ROI_CONFIG.defaultIndustry);
  const [ticketSizeRaw, setTicketSizeRaw] = useState<string>(
    String(ROI_CONFIG.defaultTicketSize)
  );
  const [budgetRaw, setBudgetRaw] = useState<string>(
    String(ROI_CONFIG.defaultAdBudget)
  );
  const [closeRateRaw, setCloseRateRaw] = useState<string>(
    String(ROI_CONFIG.defaultCloseRatePercent)
  );

  const parsedTicketSize = Number(ticketSizeRaw) || 0;
  const parsedBudget = Number(budgetRaw) || 0;
  const parsedCloseRate = Number(closeRateRaw) || 0;

  const estimate = useMemo(
    () =>
      calculateRoiMetrics({
        ticketSize: parsedTicketSize,
        monthlyAdBudget: parsedBudget,
        industry,
        closeRatePercent: parsedCloseRate,
        managementFee: selectedManagementFee,
      }),
    [parsedTicketSize, parsedBudget, industry, parsedCloseRate, selectedManagementFee]
  );

  const handleIndustryChange = (nextIndustry: RoiIndustry) => {
    setIndustry(nextIndustry);
    const benchmark = ROI_CONFIG.industryBenchmarks[nextIndustry];
    if (benchmark) {
      setTicketSizeRaw(String(benchmark.suggestedTicket));
    }
  };

  const whatsappPlanUrl = buildRoiWhatsAppUrl(
    {
      ticketSize: parsedTicketSize,
      monthlyAdBudget: parsedBudget,
      industry,
      closeRatePercent: parsedCloseRate,
      managementFee: selectedManagementFee,
    },
    estimate
  );

  const clampedTicketForSlider = Math.min(
    ROI_CONFIG.maxTicketSize,
    Math.max(ROI_CONFIG.minTicketSize, parsedTicketSize)
  );
  const clampedBudgetForSlider = Math.min(
    ROI_CONFIG.maxAdBudget,
    Math.max(ROI_CONFIG.minAdBudget, parsedBudget)
  );
  const clampedCloseRateForSlider = Math.min(
    ROI_CONFIG.maxCloseRatePercent,
    Math.max(ROI_CONFIG.minCloseRatePercent, parsedCloseRate)
  );

  return (
    <section
      id="roi-calculator"
      className="scroll-mt-24 border-t border-slate-200 dark:border-white/10 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="mb-10 max-w-2xl">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#3B82F6]">
            ROI &amp; Lead Estimator
          </span>
          <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Calculate Your Monthly Leads &amp; Return
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Adjust your average order value, monthly ad spend, and close rate to model
            expected calls, customers, and payback timeline.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Inputs */}
          <div className="lg:col-span-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E1424] p-6 sm:p-8 space-y-6">
            {/* Industry Select */}
            <div>
              <label
                htmlFor="roi-industry"
                className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-2"
              >
                Business Industry
              </label>
              <select
                id="roi-industry"
                value={industry}
                onChange={(e) => handleIndustryChange(e.target.value as RoiIndustry)}
                className="w-full rounded-xl border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-[#070B16] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/30"
              >
                {ROI_INDUSTRIES.map((item) => (
                  <option key={item} value={item}>
                    {item} (Est. CPL ~ {formatINR(ROI_CONFIG.industryBenchmarks[item].cpl)})
                  </option>
                ))}
              </select>
            </div>

            {/* Ticket Size */}
            <div>
              <div className="flex items-center justify-between gap-3 mb-2">
                <label
                  htmlFor="roi-ticket-input"
                  className="text-sm font-medium text-slate-800 dark:text-slate-200"
                >
                  Average Customer Ticket Size (Rs.)
                </label>
                <span className="font-mono text-xs font-semibold tabular-nums text-[#3B82F6] dark:text-blue-400">
                  {formatINR(parsedTicketSize)}
                </span>
              </div>
              <input
                id="roi-ticket-input"
                type="number"
                min={0}
                max={500000}
                step={100}
                value={ticketSizeRaw}
                onChange={(e) => setTicketSizeRaw(e.target.value)}
                className="w-full rounded-xl border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-[#070B16] px-3.5 py-2.5 font-mono text-sm tabular-nums text-slate-900 dark:text-white focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/30"
              />
              <input
                aria-label="Average customer ticket size slider"
                type="range"
                min={ROI_CONFIG.minTicketSize}
                max={ROI_CONFIG.maxTicketSize}
                step={100}
                value={clampedTicketForSlider}
                onChange={(e) => setTicketSizeRaw(e.target.value)}
                className="mt-3 w-full accent-[#3B82F6] cursor-pointer"
              />
              <div className="mt-1 flex justify-between font-mono text-[11px] text-slate-500 dark:text-slate-400">
                <span>{formatINR(ROI_CONFIG.minTicketSize)}</span>
                <span>{formatINR(ROI_CONFIG.maxTicketSize)}</span>
              </div>
            </div>

            {/* Monthly Ad Budget */}
            <div>
              <div className="flex items-center justify-between gap-3 mb-2">
                <label
                  htmlFor="roi-budget-input"
                  className="text-sm font-medium text-slate-800 dark:text-slate-200"
                >
                  Monthly Ad Budget (Rs.)
                </label>
                <span className="font-mono text-xs font-semibold tabular-nums text-[#3B82F6] dark:text-blue-400">
                  {formatINR(parsedBudget)}
                </span>
              </div>
              <input
                id="roi-budget-input"
                type="number"
                min={0}
                max={1000000}
                step={500}
                value={budgetRaw}
                onChange={(e) => setBudgetRaw(e.target.value)}
                className="w-full rounded-xl border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-[#070B16] px-3.5 py-2.5 font-mono text-sm tabular-nums text-slate-900 dark:text-white focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/30"
              />
              <input
                aria-label="Monthly ad budget slider"
                type="range"
                min={ROI_CONFIG.minAdBudget}
                max={ROI_CONFIG.maxAdBudget}
                step={1000}
                value={clampedBudgetForSlider}
                onChange={(e) => setBudgetRaw(e.target.value)}
                className="mt-3 w-full accent-[#3B82F6] cursor-pointer"
              />
              <div className="mt-1 flex justify-between font-mono text-[11px] text-slate-500 dark:text-slate-400">
                <span>{formatINR(ROI_CONFIG.minAdBudget)}</span>
                <span>{formatINR(ROI_CONFIG.maxAdBudget)}</span>
              </div>
            </div>

            {/* Close Rate */}
            <div>
              <div className="flex items-center justify-between gap-3 mb-2">
                <label
                  htmlFor="roi-close-rate"
                  className="text-sm font-medium text-slate-800 dark:text-slate-200"
                >
                  Lead-to-Customer Close Rate (%)
                </label>
                <span className="font-mono text-xs font-semibold tabular-nums text-[#3B82F6] dark:text-blue-400">
                  {parsedCloseRate}%
                </span>
              </div>
              <input
                id="roi-close-rate"
                type="number"
                min={1}
                max={100}
                step={1}
                value={closeRateRaw}
                onChange={(e) => setCloseRateRaw(e.target.value)}
                className="w-full rounded-xl border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-[#070B16] px-3.5 py-2.5 font-mono text-sm tabular-nums text-slate-900 dark:text-white focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/30"
              />
              <input
                aria-label="Lead close rate slider"
                type="range"
                min={ROI_CONFIG.minCloseRatePercent}
                max={ROI_CONFIG.maxCloseRatePercent}
                step={1}
                value={clampedCloseRateForSlider}
                onChange={(e) => setCloseRateRaw(e.target.value)}
                className="mt-3 w-full accent-[#3B82F6] cursor-pointer"
              />
            </div>

            {selectedServiceCount > 0 && (
              <div className="rounded-xl border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-4 py-3 text-xs text-slate-700 dark:text-slate-200">
                Including your{' '}
                <span className="font-semibold">
                  {selectedServiceCount} selected service
                  {selectedServiceCount > 1 ? 's' : ''}
                </span>{' '}
                ({formatINR(selectedManagementFee)}) in ROI &amp; payback calculations.
              </div>
            )}

            {estimate.validationError && (
              <p
                role="alert"
                className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-2.5 text-xs font-medium text-rose-600 dark:text-rose-400"
              >
                {estimate.validationError}
              </p>
            )}
          </div>

          {/* Right Column: Live Estimate Cards & Actions */}
          <div className="lg:col-span-6 min-w-0 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E1424] p-5 transition-all duration-200">
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Estimated Leads / Calls
                </div>
                <div className="mt-2 font-mono text-3xl font-bold tabular-nums text-slate-900 dark:text-white">
                  {estimate.isValid ? `~${estimate.estimatedLeads}` : '—'}
                </div>
                <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Benchmark CPL: {formatINR(estimate.costPerLead)}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E1424] p-5 transition-all duration-200">
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Estimated Customers
                </div>
                <div className="mt-2 font-mono text-3xl font-bold tabular-nums text-slate-900 dark:text-white">
                  {estimate.isValid ? `~${estimate.estimatedCustomers}` : '—'}
                </div>
                <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  At {parsedCloseRate}% close rate
                </div>
              </div>

              <div className="rounded-2xl border border-[#3B82F6]/40 bg-white dark:bg-[#0E1424] p-5 shadow-[0_0_24px_-12px_rgba(59,130,246,0.35)] transition-all duration-200">
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Estimated Monthly Revenue
                </div>
                <div className="mt-2 font-mono text-2xl sm:text-3xl font-bold tabular-nums text-[#3B82F6] dark:text-blue-400">
                  {estimate.isValid ? formatINR(estimate.estimatedRevenue) : '—'}
                </div>
                <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Total monthly outlay: {formatINR(estimate.totalMonthlyInvestment)}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E1424] p-5 transition-all duration-200">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      Estimated ROI %
                    </div>
                    <div
                      className={`mt-1.5 font-mono text-2xl sm:text-3xl font-bold tabular-nums ${
                        estimate.roiPercent >= 0
                          ? 'text-emerald-600 dark:text-[#25D366]'
                          : 'text-amber-600 dark:text-[#F59E0B]'
                      }`}
                    >
                      {estimate.isValid ? `${estimate.roiPercent}%` : '—'}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      Payback Period
                    </div>
                    <div className="mt-1.5 font-mono text-lg font-bold tabular-nums text-slate-900 dark:text-white">
                      {estimate.isValid && estimate.paybackMonths !== null
                        ? `${estimate.paybackMonths} mo`
                        : '—'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-100/70 dark:bg-[#0E1424]/80 p-5 space-y-4">
              <div className="flex items-start gap-2.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                <Calculator className="mt-0.5 h-4 w-4 shrink-0 text-[#3B82F6]" aria-hidden="true" />
                <p>
                  These are estimates based on average industry benchmarks, not
                  guaranteed results. Actual results depend on your business, offer,
                  location and competition.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
                <a
                  href={estimate.isValid ? whatsappPlanUrl : '#roi-calculator'}
                  target={estimate.isValid ? '_blank' : undefined}
                  rel={estimate.isValid ? 'noopener noreferrer' : undefined}
                  aria-disabled={!estimate.isValid}
                  onClick={(e) => {
                    if (!estimate.isValid) e.preventDefault();
                  }}
                  className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-bold text-slate-950 transition-colors ${
                    estimate.isValid
                      ? 'hover:bg-[#20bd5a] cursor-pointer'
                      : 'opacity-45 cursor-not-allowed'
                  }`}
                >
                  <WhatsAppIcon className="h-4 w-4 shrink-0" />
                  <span>Get This Plan on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => onRecommendPackage(estimate.recommendedAdsServiceId)}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#3B82F6]/60 bg-[#3B82F6]/10 px-4 py-3 text-sm font-semibold text-[#3B82F6] dark:text-blue-400 hover:bg-[#3B82F6] hover:text-white transition-colors cursor-pointer"
                >
                  <Sparkles className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Recommend a Package</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
