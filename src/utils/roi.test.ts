import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildRoiWhatsAppUrl,
  calculateRoiMetrics,
  getRecommendedAdsServiceId,
} from './roi';

test('calculateRoiMetrics computes valid estimates with and without management fee', () => {
  const base = calculateRoiMetrics({
    ticketSize: 2500,
    monthlyAdBudget: 20000,
    industry: 'Clinic',
    closeRatePercent: 20,
    managementFee: 0,
  });

  assert.equal(base.isValid, true);
  assert.equal(base.costPerLead, 180);
  assert.equal(base.estimatedLeads, 111);
  assert.equal(base.estimatedCustomers, 22.2);
  assert.equal(base.estimatedRevenue, 55500);
  assert.equal(base.roiPercent, 178);
  assert.equal(base.paybackMonths, 0.4);

  const withFee = calculateRoiMetrics({
    ticketSize: 2500,
    monthlyAdBudget: 20000,
    industry: 'Clinic',
    closeRatePercent: 20,
    managementFee: 7999,
  });
  assert.equal(withFee.totalMonthlyInvestment, 27999);
  assert.ok(withFee.roiPercent < base.roiPercent);
});

test('calculateRoiMetrics guards against zero, negative, NaN, and Infinity values', () => {
  const zeroBudget = calculateRoiMetrics({
    ticketSize: 2000,
    monthlyAdBudget: 0,
    industry: 'Salon',
    closeRatePercent: 20,
    managementFee: 0,
  });
  assert.equal(zeroBudget.isValid, false);
  assert.ok(zeroBudget.validationError);
  assert.equal(Number.isNaN(zeroBudget.roiPercent), false);
  assert.equal(zeroBudget.paybackMonths, null);

  const nanInput = calculateRoiMetrics({
    ticketSize: Number.NaN,
    monthlyAdBudget: Number.POSITIVE_INFINITY,
    industry: 'Other',
    closeRatePercent: 0,
    managementFee: Number.NaN,
  });
  assert.equal(nanInput.isValid, false);
  assert.equal(Number.isFinite(nanInput.estimatedLeads), true);
  assert.equal(Number.isFinite(nanInput.totalMonthlyInvestment), true);
});

test('getRecommendedAdsServiceId selects Starter, Growth, or Scale by budget', () => {
  assert.equal(getRecommendedAdsServiceId(15000), 'ads-starter');
  assert.equal(getRecommendedAdsServiceId(30000), 'ads-growth');
  assert.equal(getRecommendedAdsServiceId(80000), 'ads-scale');
});

test('buildRoiWhatsAppUrl formats WhatsApp message with inputs and estimates', () => {
  const inputs = {
    ticketSize: 3000,
    monthlyAdBudget: 25000,
    industry: 'Coaching Centre' as const,
    closeRatePercent: 20,
    managementFee: 13999,
  };
  const estimate = calculateRoiMetrics(inputs);
  const url = buildRoiWhatsAppUrl(inputs, estimate);
  const decoded = decodeURIComponent(url);
  assert.ok(decoded.includes('Industry: Coaching Centre'));
  assert.ok(decoded.includes('Monthly Ad Budget: Rs. 25,000'));
  assert.ok(decoded.includes('Selected Management Fee Included: Rs. 13,999'));
});
