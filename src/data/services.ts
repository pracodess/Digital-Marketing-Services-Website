/**
 * CENTRAL CONFIGURATION, SERVICES, ROI BENCHMARKS, INDUSTRY BUNDLES & FAQS
 * ---------------------------------------------------------------------------
 * Edit this file to update agency branding, phone numbers, email, social URLs,
 * service packages, prices, membership tiers, ROI assumptions, industry tabs,
 * and FAQ items without modifying UI components.
 */

export type BillingCycle = 'one-time' | '/month';

export interface ServiceItem {
  id: string;
  name: string;
  price: number;
  billingCycle: BillingCycle;
  description: string;
  features: [string, string, string];
  recommended?: boolean;
  footnote?: string;
}

export interface ServiceCategoryData {
  id: string;
  number: string;
  title: string;
  description: string;
  layout: '3-col' | '2x2';
  sectionNote?: string;
  services: ServiceItem[];
}

export type MembershipTierId = 'silver' | 'gold';

export interface MembershipPlan {
  id: MembershipTierId;
  name: string;
  price: number;
  billingLabel: string;
  discountPercent: number;
  discountBadge: string;
  popularBadge?: string;
  features: string[];
  selectButtonLabel: string;
  previewButtonLabel: string;
}

export interface DeskLine {
  id: string;
  label: string;
  displayNumber: string;
  telNumber: string;
  whatsappNumber: string;
}

export type RoiIndustry =
  | 'Clinic'
  | 'Salon'
  | 'Restaurant'
  | 'Coaching Centre'
  | 'Real Estate'
  | 'Retail Shop'
  | 'Other';

export type IndustryTab =
  | 'All'
  | 'Clinics'
  | 'Salons'
  | 'Restaurants'
  | 'Coaching Centres'
  | 'Real Estate';

export interface IndustryRecommendation {
  tab: IndustryTab;
  headline: string;
  explanation: string;
  recommendedServiceIds: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const AGENCY_CONFIG = {
  brandName: 'Pracodee',
  brandSubtitle: 'DIGITAL HUB',
  tagline: 'Joh pasine se nahayega voh Itihaas badlega',
  domainPlaceholder: 'https://[YOUR_DOMAIN]',
  heroBadge: 'Trusted by 50+ local businesses across India',
  heroHeadline: 'Turn Clicks Into Calls & WhatsApp Leads',
  heroSubheading:
    'We run high-converting Meta & Google Ads, rank your business on Google Maps, manage social media, and build fast websites built for Indian local businesses.',
  trustStats: [
    { value: '50+', label: 'Local Businesses Served' },
    { value: '3x', label: 'Avg. Lead Growth' },
    { value: '24h', label: 'Response Time' },
    { value: '100%', label: 'Transparent Reporting' },
  ],
  whatsappNumber: '917043799341',
  whatsappDefaultGreeting:
    'Hello Pracodee team, I would like to discuss digital marketing and website services for my business.',
  email: 'prathamworkash@gmail.com',
  emailLabel: 'New Inquiries & Audits',
  deskLines: [
    {
      id: 'primary-desk',
      label: 'Primary WhatsApp & Calls',
      displayNumber: '+91 70437 99341',
      telNumber: '+917043799341',
      whatsappNumber: '917043799341',
    },
    {
      id: 'strategy-desk',
      label: 'Client Strategy Desk',
      displayNumber: '+91 70437 99341',
      telNumber: '+917043799341',
      whatsappNumber: '917043799341',
    },
    {
      id: 'support-desk',
      label: 'Campaign & Web Support',
      displayNumber: '+91 70437 99341',
      telNumber: '+917043799341',
      whatsappNumber: '917043799341',
    },
  ] as DeskLine[],
  socialLinks: [
    {
      name: 'Instagram',
      handle: '@pratham_chauhan07',
      href: 'https://www.instagram.com/pratham_chauhan07/',
    },
    {
      name: 'LinkedIn',
      handle: 'Pratham Chauhan',
      href: 'https://www.linkedin.com/in/pratham-chauhan-0a285336b/',
    },
    {
      name: 'YouTube',
      handle: '@pracodee',
      href: 'https://www.youtube.com/@pracodee',
    },
  ],
  copyrightYear: '2026',
  footerAbout:
    'Performance-focused digital marketing and web engineering for clinics, salons, restaurants, coaching centres, real estate, and local shops across India.',
};

export const SERVICE_CATEGORIES: ServiceCategoryData[] = [
  {
    id: 'paid-ads',
    number: '01.',
    title: 'Paid Ads (Meta & Google Ads)',
    description:
      'Targeted ad campaigns built to drive daily phone calls and WhatsApp inquiries. Ad spend is paid separately directly to Meta/Google.',
    layout: '3-col',
    sectionNote: 'Ad spend is paid separately to Meta or Google.',
    services: [
      {
        id: 'ads-starter',
        name: 'Starter Ads Management',
        price: 7999,
        billingCycle: '/month',
        description:
          'Ideal for local shops, clinics, and salons starting paid lead generation on a single platform.',
        features: [
          '1 platform (Meta Ads OR Google Search Ads)',
          '2 ad creative sets + local geo-targeting',
          'Weekly WhatsApp lead summary report',
        ],
        footnote: 'Note: Ad spend is paid separately.',
      },
      {
        id: 'ads-growth',
        name: 'Growth Ads Management',
        price: 13999,
        billingCycle: '/month',
        description:
          'Dual-channel lead engine combining high-intent Google Search and Meta WhatsApp click campaigns.',
        features: [
          'Both Meta Ads & Google Ads managed together',
          '4 ad creative variations + A/B audience testing',
          'Conversion tracking & bi-weekly strategy calls',
        ],
        recommended: true,
        footnote: 'Note: Ad spend is paid separately.',
      },
      {
        id: 'ads-scale',
        name: 'Scale Performance Ads',
        price: 21999,
        billingCycle: '/month',
        description:
          'Aggressive multi-location or high-ticket lead generation with retargeting funnels.',
        features: [
          'Full Meta + Google + YouTube retargeting setup',
          '8 custom ad creatives & copywriting per month',
          'Dedicated campaign manager & weekly optimization',
        ],
        footnote: 'Note: Ad spend is paid separately.',
      },
    ],
  },
  {
    id: 'local-seo',
    number: '02.',
    title: 'SEO & Local SEO (Google Business Profile)',
    description:
      'Rank higher on Google Maps and local search when nearby customers look for your services.',
    layout: '3-col',
    services: [
      {
        id: 'seo-gbp-setup',
        name: 'GBP Setup & Optimization',
        price: 5999,
        billingCycle: 'one-time',
        description:
          'Complete Google Business Profile audit, category alignment, and local trust setup.',
        features: [
          'Full profile verification, categories & service list',
          'Keyword-rich business description & geo-tagged photos',
          'WhatsApp & call CTA configuration + review link kit',
        ],
      },
      {
        id: 'seo-local-monthly',
        name: 'Local SEO Monthly',
        price: 8999,
        billingCycle: '/month',
        description:
          'Consistent Google Maps ranking growth to beat nearby competitors in the top 3 map pack.',
        features: [
          '4 Google Business Profile posts & offer updates/month',
          '15+ local directory citations & NAP consistency',
          'Review reply management & monthly rank tracking',
        ],
      },
      {
        id: 'seo-full-growth',
        name: 'Full SEO Growth',
        price: 15999,
        billingCycle: '/month',
        description:
          'End-to-end website + Google Maps SEO for high-intent city-wide organic leads.',
        features: [
          'On-page technical SEO + 4 local service blogs/month',
          'High-authority local backlinks & schema markup',
          'Monthly organic traffic, calls & keyword report',
        ],
      },
    ],
  },
  {
    id: 'website-development',
    number: '03.',
    title: 'Custom Website Development',
    description:
      'Fast, mobile-first websites engineered to turn local visitors into instant WhatsApp leads and calls.',
    layout: '2x2',
    sectionNote: 'Domain & hosting are separate on all website development packages.',
    services: [
      {
        id: 'web-single-static',
        name: 'Single Page Static Website',
        price: 17999,
        billingCycle: 'one-time',
        description:
          'Clean, ultra-fast one-page website built for clinics, salons, tutors, and local service providers.',
        features: [
          'Responsive mobile-first UI + direct WhatsApp & call buttons',
          'Contact/booking inquiry form routed to WhatsApp',
          'Basic on-page SEO structure & Google Maps embed',
        ],
        footnote: 'Note: Domain & hosting are separate.',
      },
      {
        id: 'web-multi-static',
        name: 'Multi-Page Static Website',
        price: 19999,
        billingCycle: 'one-time',
        description:
          'Structured multi-page business website with dedicated service pages to rank better on Google.',
        features: [
          'Up to 6 custom pages (Home, Services, About, Gallery, Contact)',
          'SEO-friendly architecture for local keyword indexing',
          'Speed-optimized build with instant WhatsApp lead capture',
        ],
        recommended: true,
        footnote: 'Note: Domain & hosting are separate.',
      },
      {
        id: 'web-single-animated',
        name: 'Single Page Animated Website',
        price: 24999,
        billingCycle: 'one-time',
        description:
          'High-impact interactive landing page with smooth scroll transitions and premium motion craft.',
        features: [
          'Custom scroll-triggered animations & interactive sections',
          'Conversion-focused lead funnel with WhatsApp integration',
          'Performance-tuned motion that stays fast on 4G mobile',
        ],
        footnote: 'Note: Domain & hosting are separate.',
      },
      {
        id: 'web-multi-animated',
        name: 'Multi-Page Animated Website',
        price: 29999,
        billingCycle: 'one-time',
        description:
          'Flagship multi-page brand experience with bespoke motion choreography and rich service showcases.',
        features: [
          'Up to 8 animated pages with custom interactive modules',
          'Advanced technical SEO, Open Graph & analytics readiness',
          'Priority launch support & post-launch handover walkthrough',
        ],
        footnote: 'Note: Domain & hosting are separate.',
      },
    ],
  },
  {
    id: 'social-media',
    number: '04.',
    title: 'Social Media Management',
    description:
      'Consistent posts, local reels, and active community replies that build trust before customers visit.',
    layout: '3-col',
    services: [
      {
        id: 'smm-presence',
        name: 'Social Presence Starter',
        price: 6999,
        billingCycle: '/month',
        description:
          'Maintain a clean, trustworthy Instagram & Facebook feed every week.',
        features: [
          '8 designed static/carousel posts per month',
          '2 short-form reels edited from your raw clips',
          'Captions, local hashtags & scheduled publishing',
        ],
      },
      {
        id: 'smm-reels-growth',
        name: 'Reels & Engagement Pack',
        price: 11999,
        billingCycle: '/month',
        description:
          'Built for restaurants, salons, and coaching centres aiming for local discovery via Reels.',
        features: [
          '12 custom posts + 6 edited high-retention reels/month',
          'Comment & DM community management during business hours',
          'Monthly content calendar + reach & engagement report',
        ],
      },
      {
        id: 'smm-authority',
        name: 'Brand Authority Suite',
        price: 18999,
        billingCycle: '/month',
        description:
          'Full-scale social engine for multi-branch businesses wanting daily visibility and DM leads.',
        features: [
          '16 posts + 10 edited reels/month across Instagram & Facebook',
          'Active DM lead qualification & story highlights management',
          'Competitor tracking & monthly creative strategy session',
        ],
      },
    ],
  },
];

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'silver',
    name: 'SILVER MEMBERSHIP',
    price: 1499,
    billingLabel: '/ year',
    discountPercent: 10,
    discountBadge: '10% OFF every service',
    features: [
      '10% OFF all Paid Ads, SEO, Social Media & Website service fees',
      'Complimentary Website, GBP, or Meta Ad Account audit',
      'Monthly Performance Report with actionable next steps',
      '5% Referral Reward credit or a complimentary service',
    ],
    selectButtonLabel: 'Select Silver Member',
    previewButtonLabel: 'Preview 10% OFF Rates',
  },
  {
    id: 'gold',
    name: 'GOLD MEMBERSHIP',
    price: 2999,
    billingLabel: '/ year',
    discountPercent: 15,
    discountBadge: '15% OFF every service',
    popularBadge: 'Most Popular',
    features: [
      '15% OFF all services',
      'Priority Free Audit for Website, Google Business Profile & Meta Ads',
      'Detailed Monthly Performance Report on leads, reach & growth levers',
      '5% Referral Reward credit or a complimentary service on every referral',
    ],
    selectButtonLabel: 'Select Gold Member',
    previewButtonLabel: 'Preview 15% OFF Rates',
  },
];

export const AUDIT_TYPES = [
  'Website',
  'Google Business Profile',
  'Meta Ad Account',
] as const;

export type AuditType = (typeof AUDIT_TYPES)[number];

/**
 * ROI & LEAD CALCULATOR CONFIG
 * ---------------------------------------------------------------------------
 * Adjust benchmark Cost-Per-Lead (CPL in INR) per industry, slider bounds, and
 * Paid Ads budget thresholds here.
 */
export const ROI_CONFIG = {
  minTicketSize: 200,
  maxTicketSize: 50000,
  defaultTicketSize: 2500,
  minAdBudget: 5000,
  maxAdBudget: 200000,
  defaultAdBudget: 20000,
  defaultCloseRatePercent: 20,
  minCloseRatePercent: 1,
  maxCloseRatePercent: 100,
  defaultIndustry: 'Clinic' as RoiIndustry,
  industryBenchmarks: {
    Clinic: { cpl: 180, suggestedTicket: 2500 },
    Salon: { cpl: 140, suggestedTicket: 1500 },
    Restaurant: { cpl: 110, suggestedTicket: 900 },
    'Coaching Centre': { cpl: 220, suggestedTicket: 12000 },
    'Real Estate': { cpl: 650, suggestedTicket: 35000 },
    'Retail Shop': { cpl: 130, suggestedTicket: 1800 },
    Other: { cpl: 200, suggestedTicket: 3000 },
  } as Record<RoiIndustry, { cpl: number; suggestedTicket: number }>,
  /**
   * Budget thresholds used when clicking "Recommend a Package" in ROI Calculator.
   */
  packageRecommendationThresholds: {
    growthMinBudget: 25000,
    scaleMinBudget: 70000,
  },
};

export const ROI_INDUSTRIES: RoiIndustry[] = [
  'Clinic',
  'Salon',
  'Restaurant',
  'Coaching Centre',
  'Real Estate',
  'Retail Shop',
  'Other',
];

/**
 * INDUSTRY-SPECIFIC TABS & BUNDLE MAPPING
 * ---------------------------------------------------------------------------
 * Map each industry tab to recommended service IDs from SERVICE_CATEGORIES.
 */
export const INDUSTRY_TABS: IndustryTab[] = [
  'All',
  'Clinics',
  'Salons',
  'Restaurants',
  'Coaching Centres',
  'Real Estate',
];

export const INDUSTRY_RECOMMENDATIONS: Record<
  Exclude<IndustryTab, 'All'>,
  IndustryRecommendation
> = {
  Clinics: {
    tab: 'Clinics',
    headline: 'Recommended for Clinics & Healthcare Practices',
    explanation:
      'Patients search Google Maps first and book fast over WhatsApp. Combining Google Business Profile SEO + Paid Ads + a clear Multi-Page Website captures urgent local appointments consistently.',
    recommendedServiceIds: ['ads-starter', 'seo-local-monthly', 'web-multi-static'],
  },
  Salons: {
    tab: 'Salons',
    headline: 'Recommended for Salons, Spas & Beauty Studios',
    explanation:
      'Visual reels build desire while local Google Maps and WhatsApp click ads fill weekday slots. Reels + Paid Ads + GBP Setup creates repeat local walk-ins.',
    recommendedServiceIds: ['ads-starter', 'seo-gbp-setup', 'smm-reels-growth'],
  },
  Restaurants: {
    tab: 'Restaurants',
    headline: 'Recommended for Restaurants, Cafes & Cloud Kitchens',
    explanation:
      'Hungry diners check Google Maps photos, reviews, and Instagram reels before visiting. Local SEO + Reels & Engagement + a fast Single Page Website drives table bookings and direct orders.',
    recommendedServiceIds: ['seo-local-monthly', 'smm-reels-growth', 'web-single-static'],
  },
  'Coaching Centres': {
    tab: 'Coaching Centres',
    headline: 'Recommended for Coaching Centres & Institutes',
    explanation:
      'Parents compare batch results, faculty, and syllabus online before calling. Dual-channel Meta + Google Ads paired with a Multi-Page Static Website turns student inquiries into admissions.',
    recommendedServiceIds: ['ads-growth', 'seo-gbp-setup', 'web-multi-static'],
  },
  'Real Estate': {
    tab: 'Real Estate',
    headline: 'Recommended for Real Estate Agents & Builders',
    explanation:
      'High-ticket property buyers need multiple touchpoints and instant site-visit scheduling. Growth/Scale Ads + Full SEO + an Animated Multi-Page showcase maximizes qualified site visits.',
    recommendedServiceIds: ['ads-scale', 'seo-full-growth', 'web-multi-animated'],
  },
};

/**
 * FAQ ITEMS (10 OBJECTION-HANDLING QUESTIONS)
 * ---------------------------------------------------------------------------
 * Replace [BRACKETED] placeholders with your exact business policies.
 */
export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-ad-spend',
    question: 'How is ad spend billed? Is it included in the management fee?',
    answer:
      'No. Your advertising budget is paid directly to Meta (Facebook/Instagram) or Google from your own card or billing method. Our monthly management fee covers strategy, ad creative setup, targeting, tracking, and ongoing optimization separately.',
  },
  {
    id: 'faq-launch-time',
    question: 'How long does it take to launch a campaign or website?',
    answer:
      'Paid Ads and Google Business Profile setup typically go live within [3 TO 5 BUSINESS DAYS] after onboarding and asset handover. Static websites are delivered in [7 TO 10 BUSINESS DAYS], and animated multi-page websites take [14 TO 21 BUSINESS DAYS] depending on content readiness.',
  },
  {
    id: 'faq-ownership',
    question: 'Who owns the domain, hosting, website code, and ad accounts?',
    answer:
      'You retain 100% ownership of your domain, hosting account, Google Business Profile, and Meta/Google ad accounts at all times. For custom websites, [SPECIFY YOUR CODE HANDOVER POLICY, e.g., full source code and deployment access are transferred upon final payment].',
  },
  {
    id: 'faq-gst',
    question: 'Do you provide GST invoices for business expenses?',
    answer:
      '[SPECIFY GST POLICY, e.g., Yes, GST-compliant tax invoices are issued for every service and annual membership payment. Add your GSTIN during onboarding, and note whether quoted prices are exclusive of 18% GST.]',
  },
  {
    id: 'faq-seo-timeline',
    question: 'How long does SEO / Google Business Profile optimization take to show results?',
    answer:
      'Initial Google Business Profile improvements (profile completeness, category accuracy, and call/WhatsApp tracking) happen within the first [7 TO 14 DAYS]. Organic map-pack and website search rankings generally build momentum over [60 TO 90 DAYS] depending on local competition.',
  },
  {
    id: 'faq-free-audit',
    question: 'What is included in the Free Audit?',
    answer:
      'Our Free Audit reviews your chosen asset (Website, Google Business Profile, or Meta Ad Account) for conversion leaks, mobile speed, local keyword gaps, or wasted ad spend. We send a concise summary with actionable fixes directly on WhatsApp within [24 TO 48 HOURS] with zero obligation.',
  },
  {
    id: 'faq-refund-cancel',
    question: 'What is your refund and cancellation policy?',
    answer:
      '[SPECIFY REFUND & CANCELLATION POLICY, e.g., Monthly retainers can be cancelled with 15 days notice before the next billing cycle. Milestone-based website payments and ad spend already paid to Meta/Google are non-refundable once work has commenced.]',
  },
  {
    id: 'faq-membership-discount',
    question: 'How does the Silver or Gold annual membership discount work?',
    answer:
      'Selecting Silver (10% OFF) or Gold (15% OFF) applies an instant discount across all Paid Ads, SEO, Social Media, and Website development service fees for 12 months. The annual membership fee is added once per year and never applies to third-party Meta/Google ad spend or domain/hosting.',
  },
  {
    id: 'faq-reporting',
    question: 'How is campaign performance reporting shared?',
    answer:
      'We share clean, jargon-free reports covering leads, phone calls, WhatsApp clicks, ad spend, and next-step actions via [WhatsApp / Email / PDF Summary] on a [WEEKLY OR MONTHLY SCHEDULE DEPENDING ON YOUR PLAN].',
  },
  {
    id: 'faq-post-delivery',
    question: 'What happens after my website is delivered (support and revisions)?',
    answer:
      'Every website includes [SPECIFY REVISION ROUNDS, e.g., 2 rounds of pre-launch design revisions] plus [SPECIFY POST-LAUNCH SUPPORT WINDOW, e.g., 30 days of complimentary bug-fix and minor text-update support]. Ongoing feature updates or monthly maintenance can be added on request.',
  },
];
