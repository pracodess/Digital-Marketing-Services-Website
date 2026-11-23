import { AGENCY_CONFIG, ROI_CONFIG, RoiIndustry } from '../data/services';
import { formatINR } from './format';
import { buildWhatsAppUrl } from './pricing';

export interface RoiInputs {
  ticketSize: number;
  monthlyAdBudget: number;
  industry: RoiIndustry;
  closeRatePercent: number;
  managementFee: number;
}

export interface RoiEstimate {
  isValid: boolean;
  validationError: string | null;
  costPerLead: number;
  estimatedLeads: number;
  estimatedCustomers: number;
  estimatedRevenue: number;
  totalMonthlyInvestment: number;
  roiPercent: number;
  paybackMonths: number | null;
  recommendedAdsServiceId: 'ads-starter' | 'ads-growth' | 'ads-scale';
}

export function sanitizePositiveNumber(value: number): number {
  if (!Number.isFinite(value) || value < 0) return 0;
  return value;
}

export function getRecommendedAdsServiceId(
  monthlyAdBudget: number
): 'ads-starter' | 'ads-growth' | 'ads-scale' {
  if (monthlyAdBudget >= ROI_CONFIG.packageRecommendationThresholds.scaleMinBudget) {
    return 'ads-scale';
  }
  if (monthlyAdBudget >= ROI_CONFIG.packageRecommendationThresholds.growthMinBudget) {
    return 'ads-growth';
  }
  return 'ads-starter';
}

export function calculateRoiMetrics(inputs: RoiInputs): RoiEstimate {
  const ticketSize = sanitizePositiveNumber(inputs.ticketSize);
  const monthlyAdBudget = sanitizePositiveNumber(inputs.monthlyAdBudget);
  const closeRatePercent = sanitizePositiveNumber(inputs.closeRatePercent);
  const managementFee = sanitizePositiveNumber(inputs.managementFee);

  const benchmark =
    ROI_CONFIG.industryBenchmarks[inputs.industry] ??
    ROI_CONFIG.industryBenchmarks.Other;
  const costPerLead = benchmark.cpl;

  let validationError: string | null = null;
  if (ticketSize <= 0) {
    validationError = 'Enter an average customer ticket size greater than Rs. 0.';
  } else if (monthlyAdBudget <= 0) {
    validationError = 'Enter a monthly ad budget greater than Rs. 0.';
  } else if (closeRatePercent <= 0 || closeRatePercent > 100) {
    validationError = 'Close rate must be between 1% and 100%.';
  }

  const recommendedAdsServiceId = getRecommendedAdsServiceId(monthlyAdBudget);

  if (validationError) {
    return {
      isValid: false,
      validationError,
      costPerLead,
      estimatedLeads: 0,
      estimatedCustomers: 0,
      estimatedRevenue: 0,
      totalMonthlyInvestment: monthlyAdBudget + managementFee,
      roiPercent: 0,
      paybackMonths: null,
      recommendedAdsServiceId,
    };
  }

  const estimatedLeads = Math.round(monthlyAdBudget / costPerLead);
  const estimatedCustomers = Math.max(
    0,
    Math.round(estimatedLeads * (closeRatePercent / 100) * 10) / 10
  );
  const estimatedRevenue = Math.round(estimatedCustomers * ticketSize);
  const totalMonthlyInvestment = monthlyAdBudget + managementFee;

  const roiPercent =
    totalMonthlyInvestment > 0
      ? Math.round(
          ((estimatedRevenue - totalMonthlyInvestment) / totalMonthlyInvestment) * 100
        )
      : 0;

  const paybackMonths =
    estimatedRevenue > 0
      ? Math.round((totalMonthlyInvestment / estimatedRevenue) * 10) / 10
      : null;

  return {
    isValid: true,
    validationError: null,
    costPerLead,
    estimatedLeads,
    estimatedCustomers,
    estimatedRevenue,
    totalMonthlyInvestment,
    roiPercent,
    paybackMonths,
    recommendedAdsServiceId,
  };
}

export function buildRoiWhatsAppUrl(
  inputs: RoiInputs,
  estimate: RoiEstimate
): string {
  const lines = [
    `Hello ${AGENCY_CONFIG.brandName} team, I ran an ROI estimate and would like to discuss this growth plan:`,
    '',
    `Industry: ${inputs.industry}`,
    `Avg. Customer Ticket Size: ${formatINR(inputs.ticketSize)}`,
    `Monthly Ad Budget: ${formatINR(inputs.monthlyAdBudget)}`,
    `Estimated Close Rate: ${inputs.closeRatePercent}%`,
    inputs.managementFee > 0
      ? `Selected Management Fee Included: ${formatINR(inputs.managementFee)}`
      : 'Selected Management Fee Included: None (Ad spend only)',
    '',
    'Estimated Monthly Outcomes (Benchmark-based):',
    `- Est. Leads / Calls: ~${estimate.estimatedLeads}`,
    `- Est. New Customers: ~${estimate.estimatedCustomers}`,
    `- Est. Monthly Revenue: ${formatINR(estimate.estimatedRevenue)}`,
    `- Est. ROI: ${estimate.roiPercent}%`,
    estimate.paybackMonths !== null
      ? `- Est. Payback Period: ${estimate.paybackMonths} months`
      : '- Est. Payback Period: N/A',
    '',
    'Please share a recommended execution plan.',
  ];

  return buildWhatsAppUrl(AGENCY_CONFIG.whatsappNumber, lines.join('\n'));
}
