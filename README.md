# Pracodee — Digital Marketing & Web Development Agency

A fast, responsive, frontend-only lead-generation website built with React, TypeScript, Vite, and Tailwind CSS. All forms, ROI plans, and service quote selections route directly to WhatsApp with pre-filled structured messages—no backend or environment variables required.

## Quick Customization Guide

### 1. Edit Prices, Services, Memberships, Phone Numbers & Email
Open **`src/data/services.ts`**:
- **`AGENCY_CONFIG`**: Update `brandName`, `brandSubtitle`, `tagline`, `whatsappNumber`, `email`, `deskLines`, and `socialLinks`.
- **`SERVICE_CATEGORIES`**: Edit package names, prices (numeric INR values), billing cycles (`'one-time'` or `'/month'`), descriptions, and feature bullets across all 4 categories (`01.` Paid Ads, `02.` Local SEO, `03.` Custom Website Development, `04.` Social Media Management).
- **`MEMBERSHIP_PLANS`**: Adjust Silver (`1499`, `10% OFF`) and Gold (`2999`, `15% OFF`) annual pricing, discount percentages, and member benefits.
- **`ROI_CONFIG`**: Edit cost-per-lead (`cpl`) benchmarks per industry, slider min/max bounds, default close rate (`20%`), and budget thresholds for `"Recommend a Package"`.
- **`INDUSTRY_RECOMMENDATIONS`**: Edit the industry tabs (`Clinics`, `Salons`, `Restaurants`, `Coaching Centres`, `Real Estate`), recommendation banner copy, and bundled `recommendedServiceIds`.
- **`FAQ_ITEMS`**: Replace the `[BRACKETED]` placeholders in `FAQ_ITEMS` (and the matching `FAQPage` JSON-LD in `index.html`) with your exact business policies (timelines, GST, refund/cancellation, post-launch support).

### 2. Adding Case Studies & Google Reviews
Open **`src/data/caseStudies.ts`**:
- **Adding a Real Case Study**: Append an object to `CASE_STUDIES` (only with client permission) following the `CaseStudy` interface:
  ```ts
  {
    id: 'clinic-example',
    businessName: 'Horizon Dental Clinic',
    industry: 'Clinic',
    city: 'Ahmedabad',
    challenge: 'Low Google Maps visibility and missed evening inquiries.',
    whatWeDid: 'GBP optimization, Local SEO, and Meta WhatsApp click ads.',
    metric: {
      label: 'Monthly Qualified WhatsApp Leads',
      beforeValue: 18,
      afterValue: 64,
      beforeDisplay: '18 / mo',
      afterDisplay: '64 / mo',
    },
  }
  ```
- **Getting a Google Maps / Reviews Embed URL**:
  1. Search for your verified Google Business Profile on [Google Maps](https://maps.google.com).
  2. Click **Share** → **Embed a map** → copy the `src="https://www.google.com/maps/embed?..."` URL (or copy your Google Reviews widget iframe URL from your review provider).
  3. Paste that URL into `GOOGLE_REVIEWS_CONFIG.embedUrl` in `src/data/caseStudies.ts`.
  4. Paste your direct "Ask for reviews" link from Google Business Profile Manager into `GOOGLE_REVIEWS_CONFIG.reviewLink`.

### 3. Code-Split PDF Rate Card
- Clicking **Download Rate Card (PDF)** dynamically loads `jspdf` and `jspdf-autotable` (`src/utils/pdfGenerator.ts`) and reads live data straight from `src/data/services.ts` so your PDF always matches website prices.

### 4. Replace `[YOUR_DOMAIN]` & SEO Placeholders Before Publishing
Search and replace `[YOUR_DOMAIN]` and `[BRACKETED]` fields in:
- `index.html` (canonical URL, `og:url`, `og:image`, `twitter:image`, `LocalBusiness` address/hours, `FAQPage` answers)
- `public/robots.txt`
- `public/sitemap.xml`
- `src/data/services.ts` (`AGENCY_CONFIG.domainPlaceholder`, `FAQ_ITEMS`)
- `src/data/caseStudies.ts` (`GOOGLE_REVIEWS_CONFIG.reviewLink`)

### 5. Commands
```bash
npm run dev      # Local dev server (port 3000)
npm run lint     # TypeScript type-check (tsc --noEmit)
npm run build    # Production build to dist/
npx --yes tsx --test src/utils/*.test.ts  # Run pure logic unit tests
```
