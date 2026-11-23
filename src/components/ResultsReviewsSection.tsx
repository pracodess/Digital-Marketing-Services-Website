import React from 'react';
import { ArrowUpRight, BarChart3, Star } from 'lucide-react';
import {
  CASE_STUDIES,
  CaseStudy,
  GOOGLE_REVIEWS_CONFIG,
} from '../data/caseStudies';

const CaseStudyCard: React.FC<{ study: CaseStudy }> = ({ study }) => {
  const maxVal = Math.max(study.metric.beforeValue, study.metric.afterValue, 1);
  const beforePct = Math.round((study.metric.beforeValue / maxVal) * 100);
  const afterPct = Math.round((study.metric.afterValue / maxVal) * 100);

  return (
    <article className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E1424] p-6">
      <div>
        <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span>{study.industry}</span>
          <span aria-hidden="true">·</span>
          <span>{study.city}</span>
        </div>

        <h3 className="mt-2 font-heading text-xl font-bold text-slate-900 dark:text-white">
          {study.businessName}
        </h3>

        <div className="mt-4 space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
          <p>
            <span className="font-semibold text-slate-900 dark:text-white">
              Challenge:{' '}
            </span>
            {study.challenge}
          </p>
          <p>
            <span className="font-semibold text-slate-900 dark:text-white">
              What we did:{' '}
            </span>
            {study.whatWeDid}
          </p>
        </div>
      </div>

      {/* Before / After Comparison Bar */}
      <div className="mt-6 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#070B16] p-4 space-y-3">
        <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">
          {study.metric.label}
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-500 dark:text-slate-400">Before</span>
            <span className="font-mono tabular-nums text-slate-700 dark:text-slate-300">
              {study.metric.beforeDisplay}
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-slate-400 dark:bg-slate-500"
              style={{ width: `${beforePct}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="font-medium text-emerald-700 dark:text-[#25D366]">
              After
            </span>
            <span className="font-mono font-bold tabular-nums text-emerald-700 dark:text-[#25D366]">
              {study.metric.afterDisplay}
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-[#25D366]"
              style={{ width: `${afterPct}%` }}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export const ResultsReviewsSection: React.FC = () => {
  const hasEmbedUrl = Boolean(GOOGLE_REVIEWS_CONFIG.embedUrl.trim());
  const isReviewLinkConfigured =
    GOOGLE_REVIEWS_CONFIG.reviewLink.trim() !== '' &&
    !GOOGLE_REVIEWS_CONFIG.reviewLink.includes('[GOOGLE_REVIEW_LINK]');

  return (
    <section
      id="results"
      className="scroll-mt-24 border-t border-slate-200 dark:border-white/10 bg-slate-100/60 dark:bg-[#0A1020] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="mb-10 max-w-2xl">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#3B82F6]">
            Results &amp; Reviews
          </span>
          <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Verified Client Outcomes &amp; Feedback
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Real growth stories published only with client approval, alongside our
            Google Business Profile reviews.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Case Studies Area */}
          <div className="lg:col-span-7 flex flex-col">
            {CASE_STUDIES.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {CASE_STUDIES.map((study) => (
                  <CaseStudyCard key={study.id} study={study} />
                ))}
              </div>
            ) : (
              <div className="flex h-full flex-col justify-center rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E1424] p-8 text-center">
                <div
                  className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#3B82F6]/30 bg-[#3B82F6]/10 text-[#3B82F6]"
                  aria-hidden="true"
                >
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-heading text-xl font-bold text-slate-900 dark:text-white">
                  Client Case Studies
                </h3>
                <p className="mx-auto mt-2.5 max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  Case studies coming soon. We only publish results with client
                  permission.
                </p>
              </div>
            )}
          </div>

          {/* Google Reviews Area */}
          <div className="lg:col-span-5 flex flex-col">
            {hasEmbedUrl ? (
              <div className="h-full overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E1424] p-4">
                <iframe
                  title="Google Reviews"
                  src={GOOGLE_REVIEWS_CONFIG.embedUrl}
                  loading="lazy"
                  className="h-[320px] w-full rounded-xl border-0"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : (
              <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E1424] p-7 sm:p-8">
                <div>
                  <div
                    className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#F59E0B]/40 bg-[#F59E0B]/15 text-[#F59E0B]"
                    aria-hidden="true"
                  >
                    <Star className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-heading text-xl font-bold text-slate-900 dark:text-white">
                    Google Reviews
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    Worked with us on a website, Google Business Profile, or ad
                    campaign? Share your honest experience on Google.
                  </p>
                </div>

                <div className="mt-6">
                  <a
                    href={
                      isReviewLinkConfigured
                        ? GOOGLE_REVIEWS_CONFIG.reviewLink
                        : '#contact'
                    }
                    target={isReviewLinkConfigured ? '_blank' : undefined}
                    rel={isReviewLinkConfigured ? 'noopener noreferrer' : undefined}
                    title={
                      isReviewLinkConfigured
                        ? 'Leave a Google Review'
                        : 'Configure [GOOGLE_REVIEW_LINK] in src/data/caseStudies.ts'
                    }
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#F59E0B]/60 bg-[#F59E0B]/10 px-4 py-3 text-sm font-semibold text-amber-700 dark:text-[#F59E0B] hover:bg-[#F59E0B] hover:text-slate-950 transition-colors whitespace-nowrap"
                  >
                    <span>Leave us a Google review</span>
                    <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </a>
                  {!isReviewLinkConfigured && (
                    <p className="mt-2 text-center font-mono text-[11px] text-slate-500 dark:text-slate-400">
                      Link placeholder: [GOOGLE_REVIEW_LINK]
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
