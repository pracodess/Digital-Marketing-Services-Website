import React, { useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import { AUDIT_TYPES, AuditType } from '../data/services';
import {
  AuditFormValues,
  buildAuditWhatsAppUrl,
  isAuditFormValid,
  validateAuditForm,
} from '../utils/validation';

const INITIAL_VALUES: AuditFormValues = {
  name: '',
  businessName: '',
  phone: '',
  link: '',
  auditType: '',
};

export const AuditForm: React.FC = () => {
  const [values, setValues] = useState<AuditFormValues>(INITIAL_VALUES);
  const [touched, setTouched] = useState<Partial<Record<keyof AuditFormValues, boolean>>>({});
  const [submittedWhatsAppUrl, setSubmittedWhatsAppUrl] = useState<string | null>(null);

  const errors = validateAuditForm(values);
  const formIsValid = isAuditFormValid(values);

  const handleFieldChange = (field: keyof AuditFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (submittedWhatsAppUrl) {
      setSubmittedWhatsAppUrl(null);
    }
  };

  const handleBlur = (field: keyof AuditFormValues) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleAuditTypeSelect = (type: AuditType) => {
    setValues((prev) => ({ ...prev, auditType: type }));
    setTouched((prev) => ({ ...prev, auditType: true }));
    if (submittedWhatsAppUrl) {
      setSubmittedWhatsAppUrl(null);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched({
      name: true,
      businessName: true,
      phone: true,
      auditType: true,
    });

    if (!formIsValid) {
      return;
    }

    const whatsappUrl = buildAuditWhatsAppUrl(values);
    setSubmittedWhatsAppUrl(whatsappUrl);

    // Open WhatsApp in a new tab via anchor element click
    const link = document.createElement('a');
    link.href = whatsappUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setValues(INITIAL_VALUES);
    setTouched({});
    setSubmittedWhatsAppUrl(null);
  };

  return (
    <div
      id="audit"
      className="scroll-mt-24 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E1424] p-6 sm:p-8"
    >
      <div className="mb-6">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#3B82F6]">
          Free Growth Audit
        </span>
        <h2 className="mt-2 font-heading text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Claim Your Free Website, GBP, or Meta Ad Audit
        </h2>
        <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
          Share your business details and we will review your current setup, highlight
          wasted ad spend or SEO blockers, and send clear action steps directly on
          WhatsApp.
        </p>
      </div>

      {submittedWhatsAppUrl ? (
        <div
          role="status"
          aria-live="polite"
          className="rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 p-6"
        >
          <div className="flex items-start gap-3">
            <CheckCircle2
              className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600 dark:text-[#25D366]"
              aria-hidden="true"
            />
            <div>
              <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
                Audit Request Ready on WhatsApp
              </h3>
              <p className="mt-1.5 text-sm text-slate-700 dark:text-slate-300">
                Thank you, <span className="font-semibold">{values.name}</span>. Your{' '}
                <span className="font-semibold">{values.auditType}</span> audit details for{' '}
                <span className="font-semibold">{values.businessName}</span> have been
                prepared for our team on WhatsApp.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <a
                  href={submittedWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-bold text-slate-950 hover:bg-[#20bd5a] transition-colors"
                >
                  Open WhatsApp Chat
                </a>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-white/15 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="audit-name"
                className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-1.5"
              >
                Your Name<span className="text-rose-500">*</span>
              </label>
              <input
                id="audit-name"
                name="name"
                type="text"
                required
                value={values.name}
                onChange={(e) => handleFieldChange('name', e.target.value)}
                onBlur={() => handleBlur('name')}
                placeholder="e.g. Rahul Patel"
                aria-invalid={Boolean(touched.name && errors.name)}
                className="w-full rounded-xl border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-[#070B16] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/30"
              />
              {touched.name && errors.name && (
                <p className="mt-1 text-xs text-rose-500" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="audit-business"
                className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-1.5"
              >
                Business Name<span className="text-rose-500">*</span>
              </label>
              <input
                id="audit-business"
                name="businessName"
                type="text"
                required
                value={values.businessName}
                onChange={(e) => handleFieldChange('businessName', e.target.value)}
                onBlur={() => handleBlur('businessName')}
                placeholder="e.g. Horizon Dental Clinic"
                aria-invalid={Boolean(touched.businessName && errors.businessName)}
                className="w-full rounded-xl border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-[#070B16] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/30"
              />
              {touched.businessName && errors.businessName && (
                <p className="mt-1 text-xs text-rose-500" role="alert">
                  {errors.businessName}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="audit-phone"
                className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-1.5"
              >
                Phone / WhatsApp Number<span className="text-rose-500">*</span>
              </label>
              <input
                id="audit-phone"
                name="phone"
                type="tel"
                required
                value={values.phone}
                onChange={(e) => handleFieldChange('phone', e.target.value)}
                onBlur={() => handleBlur('phone')}
                placeholder="+91 98XXXXXXXX"
                aria-invalid={Boolean(touched.phone && errors.phone)}
                className="w-full rounded-xl border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-[#070B16] px-3.5 py-2.5 font-mono text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/30"
              />
              {touched.phone && errors.phone && (
                <p className="mt-1 text-xs text-rose-500" role="alert">
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="audit-link"
                className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-1.5"
              >
                Website or Social Link <span className="text-xs text-slate-400">(optional)</span>
              </label>
              <input
                id="audit-link"
                name="link"
                type="text"
                value={values.link}
                onChange={(e) => handleFieldChange('link', e.target.value)}
                placeholder="https://yourbusiness.com or @handle"
                className="w-full rounded-xl border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-[#070B16] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/30"
              />
            </div>
          </div>

          <div>
            <span className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-2">
              What would you like us to audit?<span className="text-rose-500">*</span>
            </span>
            <div className="flex flex-wrap gap-2.5" role="group" aria-label="Audit type">
              {AUDIT_TYPES.map((type) => {
                const active = values.auditType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleAuditTypeSelect(type)}
                    aria-pressed={active}
                    className={`flex-1 min-w-[140px] rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm font-medium text-center transition-all duration-150 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6] ${
                      active
                        ? 'border-[#3B82F6] bg-[#3B82F6] text-white shadow-sm'
                        : 'border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-[#070B16] text-slate-700 dark:text-slate-200 hover:border-[#3B82F6]/60'
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
            {touched.auditType && errors.auditType && (
              <p className="mt-1.5 text-xs text-rose-500" role="alert">
                {errors.auditType}
              </p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={!formIsValid}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#3B82F6] px-5 py-3.5 text-sm sm:text-base font-semibold text-white shadow-sm transition-all duration-150 enabled:hover:bg-blue-500 enabled:cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]"
            >
              <Send className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Claim My Free Audit</span>
            </button>
            <p className="mt-2.5 text-center text-xs text-slate-500 dark:text-slate-400">
              No obligation. Instant confirmation with one-click WhatsApp submission to our team.
            </p>
          </div>
        </form>
      )}
    </div>
  );
};
