import {
  AGENCY_CONFIG,
  MEMBERSHIP_PLANS,
  MembershipPlan,
  MembershipTierId,
  SERVICE_CATEGORIES,
  ServiceItem,
} from '../data/services';
import { formatINR } from './format';

export interface PricingSummary {
  selectedServices: ServiceItem[];
  serviceCount: number;
  servicesSubtotal: number;
  activeMembership: MembershipPlan | null;
  discountPercent: number;
  discountAmount: number;
  discountedServicesTotal: number;
  membershipFee: number;
  finalTotal: number;
}

export function getAllServices(): ServiceItem[] {
  return SERVICE_CATEGORIES.flatMap((category) => category.services);
}

export function getDiscountedPrice(price: number, discountPercent: number): number {
  if (discountPercent <= 0) return price;
  return Math.round(price * (1 - discountPercent / 100));
}

export function calculatePricingSummary(
  selectedServiceIds: string[],
  selectedMembershipId: MembershipTierId | null,
  allServices: ServiceItem[] = getAllServices(),
  memberships: MembershipPlan[] = MEMBERSHIP_PLANS
): PricingSummary {
  const idSet = new Set(selectedServiceIds);
  const selectedServices = allServices.filter((service) => idSet.has(service.id));
  const servicesSubtotal = selectedServices.reduce((sum, item) => sum + item.price, 0);

  const activeMembership = selectedMembershipId
    ? memberships.find((plan) => plan.id === selectedMembershipId) ?? null
    : null;

  const discountPercent = activeMembership ? activeMembership.discountPercent : 0;
  const discountedServicesTotal = selectedServices.reduce(
    (sum, item) => sum + getDiscountedPrice(item.price, discountPercent),
    0
  );
  const discountAmount = servicesSubtotal - discountedServicesTotal;
  const membershipFee = activeMembership ? activeMembership.price : 0;
  const finalTotal = discountedServicesTotal + membershipFee;

  return {
    selectedServices,
    serviceCount: selectedServices.length,
    servicesSubtotal,
    activeMembership,
    discountPercent,
    discountAmount,
    discountedServicesTotal,
    membershipFee,
    finalTotal,
  };
}

export function buildServicesWhatsAppMessage(summary: PricingSummary): string {
  const lines: string[] = [
    `Hello ${AGENCY_CONFIG.brandName} team, I would like a quote for the following selection:`,
    '',
  ];

  summary.selectedServices.forEach((service, index) => {
    const unitPrice =
      summary.discountPercent > 0
        ? `${formatINR(getDiscountedPrice(service.price, summary.discountPercent))} (was ${formatINR(service.price)})`
        : formatINR(service.price);
    lines.push(`${index + 1}. ${service.name} (${service.billingCycle}) — ${unitPrice}`);
  });

  lines.push('');
  lines.push(`Services Subtotal: ${formatINR(summary.servicesSubtotal)}`);

  if (summary.activeMembership) {
    lines.push(
      `Membership Applied: ${summary.activeMembership.name} (${summary.discountPercent}% OFF) — -${formatINR(summary.discountAmount)}`
    );
    lines.push(
      `Annual Membership Fee: ${formatINR(summary.membershipFee)} ${summary.activeMembership.billingLabel}`
    );
  }

  lines.push(`Final Estimated Total: ${formatINR(summary.finalTotal)}`);
  lines.push('');
  lines.push('Please share next steps and timeline.');

  return lines.join('\n');
}

export function buildWhatsAppUrl(phoneNumber: string, message: string): string {
  const digits = phoneNumber.replace(/\D/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
