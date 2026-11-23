import { AGENCY_CONFIG, AuditType } from '../data/services';
import { buildWhatsAppUrl } from './pricing';

export interface AuditFormValues {
  name: string;
  businessName: string;
  phone: string;
  link: string;
  auditType: AuditType | '';
}

export interface AuditFormErrors {
  name?: string;
  businessName?: string;
  phone?: string;
  auditType?: string;
}

/**
 * Normalizes an Indian phone input by stripping whitespace, hyphens, parentheses,
 * and optional +91 / 91 / leading 0 country prefixes.
 */
export function normalizeIndianPhone(rawPhone: string): string {
  const digitsOnly = rawPhone.replace(/\D/g, '');
  if (digitsOnly.length === 12 && digitsOnly.startsWith('91')) {
    return digitsOnly.slice(2);
  }
  if (digitsOnly.length === 11 && digitsOnly.startsWith('0')) {
    return digitsOnly.slice(1);
  }
  return digitsOnly;
}

export function isValidIndianPhone(rawPhone: string): boolean {
  const normalized = normalizeIndianPhone(rawPhone);
  return /^[6-9]\d{9}$/.test(normalized);
}

export function validateAuditForm(values: AuditFormValues): AuditFormErrors {
  const errors: AuditFormErrors = {};

  if (!values.name.trim()) {
    errors.name = 'Please enter your full name.';
  } else if (values.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  if (!values.businessName.trim()) {
    errors.businessName = 'Please enter your business name.';
  }

  if (!values.phone.trim()) {
    errors.phone = 'Please enter your 10-digit WhatsApp / phone number.';
  } else if (!isValidIndianPhone(values.phone)) {
    errors.phone = 'Enter a valid 10-digit Indian mobile number (e.g. +91 9876543210).';
  }

  if (!values.auditType) {
    errors.auditType = 'Please choose what you would like us to audit.';
  }

  return errors;
}

export function isAuditFormValid(values: AuditFormValues): boolean {
  return Object.keys(validateAuditForm(values)).length === 0;
}

export function buildAuditWhatsAppUrl(values: AuditFormValues): string {
  const normalizedPhone = normalizeIndianPhone(values.phone);
  const messageLines = [
    `Hello ${AGENCY_CONFIG.brandName} team! I'd like to claim a Free Audit.`,
    '',
    `Name: ${values.name.trim()}`,
    `Business Name: ${values.businessName.trim()}`,
    `Phone / WhatsApp: +91 ${normalizedPhone}`,
    `Audit Requested: ${values.auditType}`,
    `Website / Social Link: ${values.link.trim() ? values.link.trim() : 'Not provided yet'}`,
  ];

  return buildWhatsAppUrl(AGENCY_CONFIG.whatsappNumber, messageLines.join('\n'));
}
