import { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { AuditForm } from './components/AuditForm';
import { ContactCards } from './components/ContactCards';
import { DownloadRateCardButton } from './components/DownloadRateCardButton';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { IndustryTabs } from './components/IndustryTabs';
import { MembershipCard } from './components/MembershipCard';
import { Navbar } from './components/Navbar';
import { NotFoundPage } from './components/NotFoundPage';
import { SelectionBar } from './components/SelectionBar';
import { ServiceCategory } from './components/ServiceCategory';
import {
  AGENCY_CONFIG,
  INDUSTRY_RECOMMENDATIONS,
  IndustryTab,
  MEMBERSHIP_PLANS,
  MembershipTierId,
  SERVICE_CATEGORIES,
} from './data/services';
import { calculatePricingSummary } from './utils/pricing';

// Lazy-load below-the-fold sections to minimize initial JavaScript bundle
const RoiCalculator = lazy(() =>
  import('./components/RoiCalculator').then((m) => ({ default: m.RoiCalculator }))
);
const ResultsReviewsSection = lazy(() =>
  import('./components/ResultsReviewsSection').then((m) => ({
    default: m.ResultsReviewsSection,
  }))
);
const FaqSection = lazy(() =>
  import('./components/FaqSection').then((m) => ({ default: m.FaqSection }))
);

function isKnownHomePath(pathname: string): boolean {
  return pathname === '/' || pathname === '' || pathname === '/index.html';
}

export default function App() {
  // Theme state kept strictly in React state (no localStorage), defaulting to dark
  const [isDark, setIsDark] = useState<boolean>(true);
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [selectedMembershipId, setSelectedMembershipId] =
    useState<MembershipTierId | null>(null);
  const [previewMembershipId, setPreviewMembershipId] =
    useState<MembershipTierId | null>(null);
  const [activeIndustry, setActiveIndustry] = useState<IndustryTab>('All');
  const [roiRecommendedServiceId, setRoiRecommendedServiceId] = useState<
    string | null
  >(null);
  const [pathname, setPathname] = useState<string>(() =>
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    const onPopState = () => {
      setPathname(window.location.pathname);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const handleNavigateHome = () => {
    if (!isKnownHomePath(pathname)) {
      window.history.pushState({}, '', '/');
      setPathname('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleToggleService = (serviceId: string) => {
    setSelectedServiceIds((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleSelectBundle = (bundleIds: string[]) => {
    setSelectedServiceIds((prev) => {
      const allSelected = bundleIds.every((id) => prev.includes(id));
      if (allSelected) {
        return prev.filter((id) => !bundleIds.includes(id));
      }
      const nextSet = new Set([...prev, ...bundleIds]);
      return Array.from(nextSet);
    });
  };

  const handleSelectHeroIndustry = (tab: IndustryTab) => {
    setActiveIndustry(tab);
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRecommendFromRoi = (
    serviceId: 'ads-starter' | 'ads-growth' | 'ads-scale'
  ) => {
    setRoiRecommendedServiceId(serviceId);
    document
      .getElementById(`service-${serviceId}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleSelectMembership = (tierId: MembershipTierId) => {
    setSelectedMembershipId((prev) => (prev === tierId ? null : tierId));
    setPreviewMembershipId(null);
  };

  const handleTogglePreview = (tierId: MembershipTierId) => {
    setPreviewMembershipId((prev) => (prev === tierId ? null : tierId));
  };

  const handleClearAll = () => {
    setSelectedServiceIds([]);
    setSelectedMembershipId(null);
    setPreviewMembershipId(null);
  };

  const pricingSummary = useMemo(
    () => calculatePricingSummary(selectedServiceIds, selectedMembershipId),
    [selectedServiceIds, selectedMembershipId]
  );

  const displayedDiscountPlanId = previewMembershipId ?? selectedMembershipId;
  const displayedDiscountPlan = displayedDiscountPlanId
    ? MEMBERSHIP_PLANS.find((plan) => plan.id === displayedDiscountPlanId) ?? null
    : null;
  const effectiveDiscountPercent = displayedDiscountPlan
    ? displayedDiscountPlan.discountPercent
    : 0;
  const isPreviewOnly =
    Boolean(previewMembershipId) && previewMembershipId !== selectedMembershipId;

  const industryRecommendedIds =
    activeIndustry !== 'All'
      ? INDUSTRY_RECOMMENDATIONS[activeIndustry].recommendedServiceIds
      : [];

  if (!isKnownHomePath(pathname)) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#070B16] dark:text-slate-100 transition-colors duration-200">
        <Navbar
          isDark={isDark}
          onToggleTheme={() => setIsDark((prev) => !prev)}
          onNavigateHome={handleNavigateHome}
        />
        <NotFoundPage onBackHome={handleNavigateHome} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#070B16] dark:text-slate-100 transition-colors duration-200">
      <Navbar isDark={isDark} onToggleTheme={() => setIsDark((prev) => !prev)} />

      <main>
        <Hero
          activeIndustry={activeIndustry}
          onSelectHeroIndustry={handleSelectHeroIndustry}
          selectedServiceIds={selectedServiceIds}
          onSelectBundle={handleSelectBundle}
        />

        {/* SERVICES SECTION */}
        <section id="services" className="scroll-mt-24 py-16 sm:py-24">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#3B82F6]">
                  Services &amp; Transparent Pricing
                </span>
                <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Build Your Local Growth Stack
                </h2>
                <p className="mt-2.5 max-w-2xl text-sm sm:text-base text-slate-600 dark:text-slate-300">
                  Select one or more services below to build an instant custom quote
                  for your business on WhatsApp.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <DownloadRateCardButton variant="outline" />

                {displayedDiscountPlan && (
                  <div className="flex items-center gap-3 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 px-4 py-2.5 text-xs font-medium text-emerald-700 dark:text-[#25D366] shrink-0">
                    <span>
                      {isPreviewOnly
                        ? `Previewing ${displayedDiscountPlan.discountPercent}% OFF (${displayedDiscountPlan.name})`
                        : `${displayedDiscountPlan.discountPercent}% OFF Member Discount Active`}
                    </span>
                    {isPreviewOnly && (
                      <button
                        type="button"
                        onClick={() => setPreviewMembershipId(null)}
                        className="underline font-semibold cursor-pointer"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            <IndustryTabs
              activeTab={activeIndustry}
              onSelectTab={setActiveIndustry}
              selectedServiceIds={selectedServiceIds}
              onSelectBundle={handleSelectBundle}
            />

            {SERVICE_CATEGORIES.map((category, index) => (
              <ServiceCategory
                key={category.id}
                category={category}
                selectedServiceIds={selectedServiceIds}
                onToggleService={handleToggleService}
                effectiveDiscountPercent={effectiveDiscountPercent}
                isPreviewOnly={isPreviewOnly}
                recommendedServiceIds={industryRecommendedIds}
                roiRecommendedServiceId={roiRecommendedServiceId}
                showDivider={index < SERVICE_CATEGORIES.length - 1}
              />
            ))}
          </div>
        </section>

        {/* ROI CALCULATOR SECTION (between Services and Membership) */}
        <Suspense
          fallback={
            <div className="py-16 text-center text-sm text-slate-500">
              Loading ROI Calculator...
            </div>
          }
        >
          <RoiCalculator
            selectedManagementFee={pricingSummary.discountedServicesTotal}
            selectedServiceCount={pricingSummary.serviceCount}
            onRecommendPackage={handleRecommendFromRoi}
          />
        </Suspense>

        {/* MEMBERSHIP SECTION */}
        <section
          id="membership"
          className="scroll-mt-24 border-t border-slate-200 dark:border-white/10 bg-slate-100/70 dark:bg-[#0A1020] py-16 sm:py-24"
        >
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-amber-600 dark:text-[#F59E0B]">
                VIP Annual Membership
              </span>
              <h2
                className="mt-2 font-heading text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white"
                style={{ textWrap: 'balance' }}
              >
                👑 Introducing the {AGENCY_CONFIG.brandName} Membership
              </h2>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                Save more. Grow more. Stay ahead of your competition. Become a member
                and get up to 10-15% OFF on every service.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {MEMBERSHIP_PLANS.map((plan) => (
                <MembershipCard
                  key={plan.id}
                  plan={plan}
                  isSelected={selectedMembershipId === plan.id}
                  isPreviewActive={previewMembershipId === plan.id}
                  onSelect={handleSelectMembership}
                  onTogglePreview={handleTogglePreview}
                />
              ))}
            </div>
          </div>
        </section>

        {/* RESULTS & GOOGLE REVIEWS SECTION */}
        <Suspense fallback={null}>
          <ResultsReviewsSection />
        </Suspense>

        {/* FAQ SECTION */}
        <Suspense fallback={null}>
          <FaqSection />
        </Suspense>

        {/* FREE AUDIT & CONTACT SECTION */}
        <section
          id="contact"
          className="scroll-mt-24 border-t border-slate-200 dark:border-white/10 py-16 sm:py-24"
        >
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7">
                <AuditForm />
              </div>
              <div className="lg:col-span-5">
                <ContactCards />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <FloatingWhatsApp isSelectionBarVisible={pricingSummary.serviceCount > 0} />

      <SelectionBar summary={pricingSummary} onClearAll={handleClearAll} />
    </div>
  );
}
