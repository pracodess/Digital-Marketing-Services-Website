/**
 * CASE STUDIES & GOOGLE REVIEWS CONFIGURATION
 * ---------------------------------------------------------------------------
 * 1. Add verified client case studies to CASE_STUDIES below ONLY with explicit
 *    client permission. Leave empty ([]) to show the placeholder message.
 * 2. Paste your Google Reviews widget / Maps embed URL into
 *    GOOGLE_REVIEWS_CONFIG.embedUrl, and your direct review link into
 *    GOOGLE_REVIEWS_CONFIG.reviewLink.
 */

export interface CaseStudyMetric {
  label: string;
  beforeValue: number;
  afterValue: number;
  beforeDisplay: string;
  afterDisplay: string;
}

export interface CaseStudy {
  id: string;
  businessName: string;
  industry: string;
  city: string;
  challenge: string;
  whatWeDid: string;
  metric: CaseStudyMetric;
}

/**
 * Empty by default — never invent fake client names, reviews, or metrics.
 */
export const CASE_STUDIES: CaseStudy[] = [];

export const GOOGLE_REVIEWS_CONFIG = {
  /**
   * Optional: Paste an iframe-compatible Google Reviews / Maps widget URL here.
   * When empty (''), the embed is hidden and a "Leave us a Google review" card is shown.
   */
  embedUrl: '',
  /**
   * Placeholder placeholder for your Google Business Profile review link.
   */
  reviewLink: '[GOOGLE_REVIEW_LINK]',
};
