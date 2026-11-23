import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildAuditWhatsAppUrl,
  isAuditFormValid,
  isValidIndianPhone,
  normalizeIndianPhone,
  validateAuditForm,
} from './validation';

test('normalizeIndianPhone and isValidIndianPhone handle Indian formats', () => {
  assert.equal(normalizeIndianPhone('+91 98765-43210'), '9876543210');
  assert.equal(normalizeIndianPhone('09876543210'), '9876543210');
  assert.equal(isValidIndianPhone('9876543210'), true);
  assert.equal(isValidIndianPhone('+91 7043799341'), true);
  assert.equal(isValidIndianPhone('1234567890'), false);
  assert.equal(isValidIndianPhone('98765'), false);
});

test('validateAuditForm enforces required fields and audit type', () => {
  const emptyErrors = validateAuditForm({
    name: '',
    businessName: '',
    phone: '',
    link: '',
    auditType: '',
  });
  assert.ok(emptyErrors.name);
  assert.ok(emptyErrors.businessName);
  assert.ok(emptyErrors.phone);
  assert.ok(emptyErrors.auditType);
  assert.equal(
    isAuditFormValid({
      name: 'Rahul Patel',
      businessName: 'Horizon Dental Clinic',
      phone: '+91 9876543210',
      link: '',
      auditType: 'Google Business Profile',
    }),
    true
  );
});

test('buildAuditWhatsAppUrl encodes business details properly', () => {
  const url = buildAuditWhatsAppUrl({
    name: 'Rahul Patel',
    businessName: 'Horizon Dental Clinic',
    phone: '9876543210',
    link: 'https://horizondental.in',
    auditType: 'Website',
  });
  assert.ok(url.startsWith('https://wa.me/917043799341?text='));
  assert.ok(decodeURIComponent(url).includes('Horizon Dental Clinic'));
  assert.ok(decodeURIComponent(url).includes('Audit Requested: Website'));
});
