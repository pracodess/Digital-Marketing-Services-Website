import test from 'node:test';
import assert from 'node:assert/strict';
import { formatINR } from './format';
import {
  buildServicesWhatsAppMessage,
  calculatePricingSummary,
  getDiscountedPrice,
} from './pricing';

test('formatINR formats Indian numbering cleanly', () => {
  assert.equal(formatINR(17999), 'Rs. 17,999');
  assert.equal(formatINR(1499), 'Rs. 1,499');
  assert.equal(formatINR(100000), 'Rs. 1,00,000');
});

test('getDiscountedPrice applies 10% and 15% discounts accurately', () => {
  assert.equal(getDiscountedPrice(10000, 0), 10000);
  assert.equal(getDiscountedPrice(10000, 10), 9000);
  assert.equal(getDiscountedPrice(20000, 15), 17000);
});

test('calculatePricingSummary computes totals with and without membership', () => {
  const noMember = calculatePricingSummary(['web-multi-static', 'ads-starter'], null);
  assert.equal(noMember.serviceCount, 2);
  assert.equal(noMember.servicesSubtotal, 27998);
  assert.equal(noMember.discountPercent, 0);
  assert.equal(noMember.membershipFee, 0);
  assert.equal(noMember.finalTotal, 27998);

  const goldMember = calculatePricingSummary(['web-multi-static', 'ads-starter'], 'gold');
  assert.equal(goldMember.discountPercent, 15);
  assert.equal(goldMember.discountedServicesTotal, 16999 + 6799);
  assert.equal(goldMember.membershipFee, 2999);
  assert.equal(goldMember.finalTotal, 16999 + 6799 + 2999);
});

test('buildServicesWhatsAppMessage includes selected services, discount, and final total', () => {
  const summary = calculatePricingSummary(['web-single-static'], 'silver');
  const message = buildServicesWhatsAppMessage(summary);
  assert.match(message, /Single Page Static Website/);
  assert.match(message, /SILVER MEMBERSHIP/);
  assert.match(message, /10% OFF/);
  assert.match(message, /Annual Membership Fee: Rs\. 1,499/);
});
